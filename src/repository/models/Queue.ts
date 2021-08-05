export interface QueueData {
  currentUserRole: string;
  customerServed: null;
  isActive: boolean;
  isMyLastCustomer: boolean;
  minutesToNextFree: number;
  queue: QueueClass;
  queueLength: number;
  queueLengthBooked: number;
  queueLengthNonBooked: number;
  queueOccupancy: QueueOccupancy;
  serversAvailable: ServersAvailable[];
  staffAvailable: number;
  staffTotal: number;
}

export interface QueueClass {
  advanceBookingsMinutes: number;
  advanceBookingsWeeks: number;
  advisorCannotChooseCustomer: boolean;
  allowedToToggleCustomerDescriptionOption: boolean;
  applyTicketNumber: boolean;
  averageServeTimeMinutes: number;
  bookingStart: number;
  bookingTimings: string;
  bufferSpace: number;
  captureOrderNumber: boolean;
  clearQueueOvernight: boolean;
  colour: null;
  conciergeAcceptReject: boolean;
  customerDescriptionEnabled: boolean;
  customerEmailRequired: boolean;
  customerEmailVisible: boolean;
  customerNameRequired: boolean;
  customerNameRequiredKiosk: boolean;
  customerNameVisible: boolean;
  customerPostcodeRequired: boolean;
  customerPostcodeVisible: boolean;
  customerQuestionEnabled: boolean;
  customerSurnameRequired: boolean;
  customerSurnameVisible: boolean;
  customerTimings: string;
  customersToday: Customer[];
  finishReminder: boolean;
  forceAdvisorToReportOutcome: boolean;
  groupSizeRequired: boolean;
  groupSizeVisible: boolean;
  id: number;
  identifier: string;
  isBookingAllowed: boolean;
  isRestaurant: boolean;
  isRetainTicketNumber: boolean;
  isTabletCollectionEnabled: boolean;
  isWalkinAllowed: boolean;
  isWalkoutDuringCustomerAddEnabled: boolean;
  maxGroupSize: number;
  maxQueueLength: null;
  minWaitTimeMinutes: null;
  mobileVisible: boolean;
  name: string;
  numberWithDuplicatedNameKiosk: boolean;
  outcomeReportingBooking: boolean;
  outcomeReportingWalkin: boolean;
  outcomesEnabled: boolean;
  pagerRequired: boolean;
  pagerVisible: boolean;
  queueMessagesThresholdMinutes: number;
  queueMessagesThresholdPosition: number;
  rejectReasonAllowFreeText: boolean;
  rejectReasons: any[];
  removeCustomerEnabled: boolean;
  removeCustomerHours: null;
  removeCustomerMins: null;
  removeCustomerMinutes: null;
  requestOutcomeAdvisors: boolean;
  requestOutcomeConcierge: boolean;
  requiredMpn: boolean;
  secondsAcceptReject: number;
  serverAcceptReject: boolean;
  serverAllowedBreak: boolean;
  serverCannotViewProducts: boolean;
  servers: ServerElement[];
  serversCanOnlyServeBookingsAssignedToThemselves: boolean;
  servingServers: any[];
  showAllUncollected: boolean;
  showAssignedCustomerPopup: boolean;
  skipJoinMessage: boolean;
  smsLanguagesEnabled: any[];
  smsRestricted: boolean;
  snsTopicArn: string;
  staffBookingAvailability: number;
  staffTimings: string;
  tagSelectionList: any[];
  tags: any[];
  ticketNumberTag: string;
  unreadMessagesForQueue: number;
  venue: Venue;
}

export interface Customer {
  bookedServer: null;
  bookingEndTime: null;
  bookingStartTime: null;
  collectingServer: null;
  currentPosition: number;
  customer: CustomerProfile;
  expectedTime: string;
  hasAnsweredQuestions: boolean;
  hasBeenSentReturnMessage: boolean;
  id: number;
  inStore: boolean;
  isFixed: boolean;
  joinedTime: string;
  lastSMSStatus: null;
  numberSentReturnMessage: number;
  originalExpectedTime: string;
  product: Product;
  productDescription: null;
  timeArrivedInStore: null;
  timeSentReturnMessage: null | string;
  waitTime: null;
  waitTimePercentComplete: number;
}

export interface CustomerProfile {
  bookingRef: string;
  createdBy: ServerElement;
  createdBySystem: null;
  customerProfile: null;
  emailAddress: null | string;
  firstName: string;
  groupSize: number;
  id: number;
  isInMultipleQueue: boolean;
  language: Language;
  merchantCustomer: MerchantCustomer;
  mobileNetwork: null;
  mobileNumber: string;
  name: string;
  notes: string;
  numberCountryCode: string;
  orderNumber: null;
  pagerNumber: null;
  postCode: null;
  surname: string;
  ticketNumber: string;
  title: null;
  unreadMessages: number;
}

export interface ServerElement {
  displayName: string;
  id: number;
}

export interface Language {
  isoCode: string;
  name: string;
}

export interface MerchantCustomer {
  id: number;
}

export interface Product {
  averageServeTimeMinutes: number;
  colour: null;
  id: number;
  name: string;
}

export interface Venue {
  id: number;
  isBookingEnabled: boolean;
  isCustomerProfileEnabled: boolean;
  isCustomerProfileIconEnabled: boolean;
  isWalkinEnabled: boolean;
  name: string;
}

export interface QueueOccupancy {
  current: number;
  kioskBehaviourWhenUnderCapacity: string;
  maximum: number;
}

export interface ServersAvailable {
  isAlwaysAvailable: boolean;
  minutesUntilNextAvailability: number;
  nextAvailableMinutes: number;
  server: ServersAvailableServer;
}

export interface ServersAvailableServer {
  currentBreakReason: null;
  displayName: string;
  id: number;
  isOnBreak: boolean;
  location: null;
}
