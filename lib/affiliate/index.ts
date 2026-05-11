/**
 * Affiliate barrel — single import surface for all helpers + types.
 *
 * Conflict D resolution: 9 real helpers + 2 stubs that throw
 * `NoIsraelInventoryError`. AffiliateCard imports everything from this
 * module and dispatches by its `partner` prop.
 */

// 9 real helpers
export { bookingLink, type BookingLinkOpts } from './booking';
export { civitatisLink, type CivitatisLinkOpts } from './civitatis';
export { viatorLink, type ViatorLinkOpts } from './viator';
export { getYourGuideLink, type GetYourGuideLinkOpts } from './getYourGuide';
export { rentalcarsLink, type RentalcarsLinkOpts } from './rentalcars';
export { safetyWingLink, type SafetyWingLinkOpts } from './safetyWing';
export { skyscannerLink, type SkyscannerLinkOpts } from './skyscanner';
export { hostelworldLink, type HostelworldLinkOpts } from './hostelworld';
export { discoverCarsLink, type DiscoverCarsLinkOpts } from './discoverCars';

// 2 stubs (Conflict D)
export { klookLink } from './klook';
export { goCityLink } from './goCity';

// Shared types + availability lookup
export { NoIsraelInventoryError } from './types';
export { affiliateAvailability, allPartners, type State } from './availability';
