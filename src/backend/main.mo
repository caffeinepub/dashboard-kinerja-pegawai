import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // COMPONENTS

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  let approvalState = UserApproval.initState(accessControlState);

  // Compare module for (Principal, Text) is required for custom types to enable sorting
  module PrincipalTextTuple {
    public func compare(a : (Principal, Text), b : (Principal, Text)) : Order.Order {
      switch (Principal.compare(a.0, b.0)) {
        case (#equal) { Text.compare(a.1, b.1) };
        case (order) { order };
      };
    };
  };

  // Compare module is required for custom types to enable sorting
  module PerformanceEntry {
    public type T = {
      employeeId : Principal;
      period : Text;
      sasaranKinerja : Text;
      indicatorList : [Indicator];
    };
    public func compare(a : T, b : T) : Order.Order {
      switch (Principal.compare(a.employeeId, b.employeeId)) {
        case (#equal) { Text.compare(a.period, b.period) };
        case (order) { order };
      };
    };
  };

  // Compare module is required for custom types to enable sorting
  module EmployeeProfile {
    public type T = {
      nama : Text;
      nip : Text;
      jabatan : Text;
      lokasiKerja : Text;
      kecamatan : Text;
      kabupaten : Text;
    };
    public func compare(a : T, b : T) : Order.Order {
      Text.compare(a.nama, b.nama);
    };
  };

  type ApprovalStatus = {
    #approved;
    #rejected;
    #pending;
  };

  public type EmployeeProfile = EmployeeProfile.T;

  public type Indicator = {
    no : Nat;
    uraian : Text;
    targetJumlah : Float;
    targetSatuan : Text;
    capaianJumlah : Float;
    capaianPersentase : Float;
    sumberDataEvaluasi : Text;
    buktiDukung : Text;
  };

  public type PerformanceEntry = PerformanceEntry.T;

  public type AdminFeedback = {
    employeeId : Principal;
    period : Text;
    feedbackText : Text;
    overallRating : Nat;
    createdAt : Int;
  };

  public type PerformanceSummary = {
    employeeId : Principal;
    period : Text;
    totalObjectives : Nat;
    averageAchievement : Float;
    overallRating : Nat;
  };

  // STATE

  let profiles = Map.empty<Principal, EmployeeProfile>();
  let performanceEntries = Map.empty<Principal, Map.Map<Text, PerformanceEntry>>();
  let feedbackEntries = Map.empty<(Principal, Text), AdminFeedback>();

  // EMPLOYEE PROFILE MANAGEMENT

  public shared ({ caller }) func createOrUpdateEmployeeProfile(profile : EmployeeProfile) : async () {
    if (not (UserApproval.isApproved(approvalState, caller) or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only approved employees or admins can create/update profiles");
    };
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerEmployeeProfile() : async EmployeeProfile {
    if (not (UserApproval.isApproved(approvalState, caller) or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only approved employees or admins can view profiles");
    };
    profiles.get(caller).unwrap();
  };

  public query ({ caller }) func getAllEmployeeProfiles() : async [EmployeeProfile] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all employee profiles");
    };
    profiles.values().toArray().sort();
  };

  // PERFORMANCE DATA MANAGEMENT

  public shared ({ caller }) func createOrUpdatePerformanceEntry(period : Text, entry : PerformanceEntry) : async () {
    // Verify caller is approved employee or admin
    if (not (UserApproval.isApproved(approvalState, caller) or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only approved employees or admins can create/update performance entries");
    };

    // Critical: Verify that the employee can only create/update their own performance data
    // Admin can create/update for any employee
    if (entry.employeeId != caller and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Employees can only create/update their own performance entries");
    };

    // Update indicatorList with calculated capaianPersentase
    let updatedIndicators = entry.indicatorList.map(
      func(indicator) {
        {
          indicator with
          capaianPersentase = if (indicator.targetJumlah > 0) {
            indicator.capaianJumlah / indicator.targetJumlah * 100.0;
          } else {
            0.0;
          };
        };
      }
    );

    let updatedEntry = {
      entry with
      indicatorList = updatedIndicators;
    };

    // Get or create inner map for employee
    let employeeMap = switch (performanceEntries.get(entry.employeeId)) {
      case (null) {
        let newMap = Map.empty<Text, PerformanceEntry>();
        newMap;
      };
      case (?map) { map };
    };

    employeeMap.add(period, updatedEntry);
    performanceEntries.add(entry.employeeId, employeeMap);
  };

  public query ({ caller }) func getPerformanceEntriesForEmployee(employeeId : Principal) : async [PerformanceEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can view other employees' performance entries");
    };

    switch (performanceEntries.get(employeeId)) {
      case (null) { [] };
      case (?map) { map.values().toArray().sort() };
    };
  };

  public query ({ caller }) func getCallerPerformanceEntries() : async [PerformanceEntry] {
    if (not (UserApproval.isApproved(approvalState, caller) or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only approved employees or admins can view performance entries");
    };

    switch (performanceEntries.get(caller)) {
      case (null) { [] };
      case (?map) { map.values().toArray().sort() };
    };
  };

  public query ({ caller }) func getPerformanceEntry(employeeId : Principal, period : Text) : async ?PerformanceEntry {
    // Allow employee or admin to view a specific entry
    if (not (employeeId == caller or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only employee or admin can view this performance entry");
    };

    switch (performanceEntries.get(employeeId)) {
      case (null) { null };
      case (?map) { map.get(period) };
    };
  };

  public query ({ caller }) func getAllPerformanceEntries() : async [PerformanceEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can view all entries");
    };

    performanceEntries.values().map(
      func(employeeMap) { employeeMap.values(); }
    ).flatten().toArray();
  };

  // ADMIN FEEDBACK MANAGEMENT

  public shared ({ caller }) func addOrUpdateFeedback(employeeId : Principal, period : Text, feedbackText : Text, overallRating : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can add or update feedback");
    };

    if (overallRating < 1 or overallRating > 5) { Runtime.trap("Rating must be between 1-5") };

    let feedback : AdminFeedback = {
      employeeId;
      period;
      feedbackText;
      overallRating;
      createdAt = Time.now();
    };

    feedbackEntries.add((employeeId, period), feedback);
  };

  public query ({ caller }) func getFeedback(employeeId : Principal, period : Text) : async ?AdminFeedback {
    // Allow only the employee or admin to view feedback
    if (not (employeeId == caller or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only the employee or admin can view feedback");
    };

    feedbackEntries.get((employeeId, period));
  };

  public query ({ caller }) func getFeedbackForEmployee(employeeId : Principal) : async [AdminFeedback] {
    // Allow employee to view their own feedback, or admin to view any feedback
    if (not (employeeId == caller or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only the employee or admin can view feedback");
    };

    feedbackEntries.entries().filter(
      func(((id, _), _)) { employeeId == id },
    ).map(
      func(_, feedback) { feedback }
    ).toArray();
  };

  public query ({ caller }) func getAllFeedback() : async [AdminFeedback] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can view all feedback");
    };
    feedbackEntries.values().toArray();
  };

  // PERFORMANCE SUMMARY

  public query ({ caller }) func getPerformanceSummary(employeeId : Principal, period : Text) : async ?PerformanceSummary {
    if (not (employeeId == caller or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only employee or admin can view summary");
    };

    switch (performanceEntries.get(employeeId)) {
      case (null) { null };
      case (?map) {
        switch (map.get(period)) {
          case (null) { null };
          case (?entry) {
            let totalObjectives = 1;
            let totalAchievement = entry.indicatorList.foldLeft(
              0.0,
              func(acc, indicator) {
                acc + indicator.capaianPersentase;
              },
            );
            let averageAchievement = if (totalObjectives > 0) {
              totalAchievement / totalObjectives.toFloat();
            } else { 0.0 };

            let overallRating = switch (feedbackEntries.get((employeeId, period))) {
              case (null) { 0 };
              case (?feedback) { feedback.overallRating };
            };

            ?{
              employeeId;
              period;
              totalObjectives;
              averageAchievement;
              overallRating;
            };
          };
        };
      };
    };
  };

  public query ({ caller }) func getAllEmployeesPerformanceSummary(period : Text) : async [PerformanceSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can view all summaries");
    };

    performanceEntries.entries().map(
      func(employeeId, employeeMap) {
        switch (employeeMap.get(period)) {
          case (null) { null };
          case (?entry) {
            let totalObjectives = 1;
            let totalAchievement = entry.indicatorList.foldLeft(
              0.0,
              func(acc, indicator) {
                acc + indicator.capaianPersentase;
              },
            );
            let averageAchievement = if (totalObjectives > 0) {
              totalAchievement / totalObjectives.toFloat();
            } else { 0.0 };

            let overallRating = switch (feedbackEntries.get((employeeId, period))) {
              case (null) { 0 };
              case (?feedback) { feedback.overallRating };
            };

            ?{
              employeeId;
              period;
              totalObjectives;
              averageAchievement;
              overallRating;
            };
          };
        };
      }
    ).toArray().filter(
      func(x) {
        x.isSome();
      }
    ).map(
      func(opt) {
        opt.unwrap();
      }
    );
  };

  // QUERY APPROVAL STATUS (for client-side routing)

  public query ({ caller }) func queryStatus() : async {
    accessLevel : AccessControl.UserRole;
    approvalStatus : ApprovalStatus;
  } {
    let role = AccessControl.getUserRole(accessControlState, caller);
    let approvalStatus = if (AccessControl.hasPermission(accessControlState, caller, #admin)) {
      #approved;
    } else if (UserApproval.isApproved(approvalState, caller)) { #approved } else {
      #pending;
    };
    { accessLevel = role; approvalStatus };
  };

  // APPROVAL MANAGEMENT

  public query ({ caller }) func isCallerApproved() : async Bool {
    UserApproval.isApproved(approvalState, caller) or AccessControl.hasPermission(accessControlState, caller, #admin);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };
};
