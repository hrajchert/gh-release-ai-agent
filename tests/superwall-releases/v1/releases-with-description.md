# 3.12.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.12.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.12.0)
- **Author**: yusuftor
- **Created At**: 2024-11-22T14:04:31Z

### Enhancements

- Adds the `SuperwallOption` `shouldObservePurchases`. Set this to `true` to allow us to observe StoreKit 1 transactions you make with your app outside of Superwall. When this is enabled Superwall will not finish your external transactions. StoreKit 2 will be widely supported in the next major version of our SDK.
- Adds Apple Search Ads attribution data to user attributes, which is visible on the user's page in Superwall. Attribution data will be collected if you have enabled Basic or Advanced Apple Search Ads in the Superwall dashboard settings. Advanced attribution data includes the keyword name, campaign name, bid amount, match type, and more. Otherwise, the basic attribution data will be collected, which is mostly IDs. This data will soon be added to Charts.
- Adds `isSubscribed` to product attributes so that you can use `products.primary.isSubscribed` as a dynamic value in the paywall editor.
- Adds `device.appVersionPadded` to the device properties that you can use in audience filters.
- Adds a `notificationPermissionsDenied` `PaywallOption`, which you can set to show an alert after a user denies notification permissions.

### Fixes

- Fixes issue where network requests that returned an error code weren't being retried.
- Fixes date formatting on a device property.

# 3.11.3

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.11.3](https://github.com/superwall/Superwall-iOS/releases/tag/3.11.3)
- **Author**: yusuftor
- **Created At**: 2024-11-01T14:50:43Z

### Enhancements

- Updates Superscript to [0.1.16](https://github.com/superwall/Superscript-iOS/releases/tag/0.1.16).

# 3.11.2

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.11.2](https://github.com/superwall/Superwall-iOS/releases/tag/3.11.2)
- **Author**: yusuftor
- **Created At**: 2024-11-01T13:02:49Z

### Enhancements

- Adds `shimmerView_start` and `shimmerView_complete` events. The `shimmerView_complete` event contains a `visible_duration` parameter which indicates how long the shimmer view was visible after paywall open, if at all.
- Adds `isScrollEnabled` to `PaywallInfo`, which indicates whether the webview should scroll or not.
- Updates Superscript to [v0.1.15](https://github.com/superwall/Superscript-iOS/releases/tag/0.1.15).
- Adds `$source`, `$store`, and `$storekit_version` to transaction events.

### Fixes

- Fixes issue where using a `PurchaseController` with `Superwall.shared.purchase(product)` was resulting in transaction events being tracked twice.
- Fixes build issues for visionOS, Mac Catalyst, and watchOS.

# 3.11.1

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.11.1](https://github.com/superwall/Superwall-iOS/releases/tag/3.11.1)
- **Author**: yusuftor
- **Created At**: 2024-10-22T20:04:30Z

### Fixes

- Fixes an issue when getting the Superscript package.

# 3.11.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.11.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.11.0)
- **Author**: yusuftor
- **Created At**: 2024-10-22T14:45:42Z

### Enhancements

- Adds a `PaywallView` for SwiftUI users using iOS 14+. You can use this as a standalone paywall view that you can embed and present however you like instead of using `register`. This uses `getPaywall(forEvent:params:paywallOverrides:)` under the hood. Note that you're responsible for the deallocation of the view. If you have a `PaywallView` presented somewhere and you try to present the same `PaywallView` elsewhere, you will get a crash.
- Adds our `Superscript` package as a dependency. We are migrating towards using Google's Common Expression Language (CEL) in audience filters to allow for more complex expressions. The use of this is behind a feature flag.

### Fixes

- visionOS fixes.

# 3.10.2

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.10.2](https://github.com/superwall/Superwall-iOS/releases/tag/3.10.2)
- **Author**: yusuftor
- **Created At**: 2024-10-18T16:19:44Z

### Enhancements

- Adds `maxConfigRetryCount` as a `SuperwallOption`. Use this to determine the number of times the SDK will attempt to get the Superwall configuration after a network failure before it times out.

# 3.10.1

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.10.1](https://github.com/superwall/Superwall-iOS/releases/tag/3.10.1)
- **Author**: yusuftor
- **Created At**: 2024-10-11T17:12:25Z

### Fixes

- Tweaks logic for `purchase(_:)` and `restorePurchases()` so the SDK never finishes transactions made when there's a purchase controller present.
- Fixes internal caching issues of the Superwall config.

# 3.10.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.10.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.10.0)
- **Author**: yusuftor
- **Created At**: 2024-10-04T13:00:11Z

### Enhancements

- Adds `purchase(_:)` to initiate a purchase of an `SKProduct` via Superwall regardless of whether you are using paywalls or not.
- Adds `restorePurchases()` to restore purchases via Superwall.
- Adds an optional `paywall(_:loadingStateDidChange)` function to the `PaywallViewControllerDelegate`. This is called when the loading state of the presented `PaywallViewController` did change.
- Makes `loadingState` on the `PaywallViewController` a public published property.

### Fixes

- Tweaks AdServices token logic to prevent getting the token twice.

# 3.9.1

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.9.1](https://github.com/superwall/Superwall-iOS/releases/tag/3.9.1)
- **Author**: yusuftor
- **Created At**: 2024-09-26T12:14:20Z

### Fixes

- Moves to collecting just the AdServices attribute token, which will be process by our backend. Adds `adServicesTokenRequest_start`, `adServicesTokenRequest_complete`, and `adServicesTokenRequest_fail`.

# 3.9.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.9.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.9.0)
- **Author**: yusuftor
- **Created At**: 2024-09-25T16:41:42Z

### Enhancements

- If a network issue occurs while retrieving the latest Superwall configuration, or it takes longer than 1s to retrieve, the SDK falls back to a cached version. Then it tries to refresh it in the background. This behavior is behind a feature flag.
- When the Superwall configuration is set or refreshed, a `config_refresh` event is tracked, which will give insight into whether a cached version of the Superwall configuration is being used or not.
- When the Superwall configuration fails to be retrieved, a `config_fail` event is tracked.
- Adds the `config_caching` capability.
- Adds the `SuperwallOption` `collectAdServicesAttribution`. When set to `true`, this will get the app-download campaign attributes associated with Apple Search Ads and attach them to the user attributes. This happens once per user per install. Calling `Superwall.shared.reset()` will fetch the attributes again and attach them to the new user.
- Adds`adServicesAttributionRequest_start`, `adServicesAttributionRequest_fail`, and `adServicesAttributionRequest_complete` events for the lifecycle of collecting AdServices attributes.

### Fixes

- Adds in missing `weak self` references inside task group closures.

# 3.8.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.8.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.8.0)
- **Author**: yusuftor
- **Created At**: 2024-09-12T15:25:05Z

### Enhancements

- Adds `Superwall.shared.confirmAllAssignments()`, which confirms assignments for all placements and returns an array of all confirmed experiment assignments. Note that the assignments may be different when a placement is registered due to changes in user, placement, or device parameters used in audience filters.
- Adds a published property `Superwall.shared.configurationStatus`, which replaces `isConfigured`. This is an enum which can either be `pending`, `configured`, or `failed`.

### Fixes

- Fixes `UIScreen unavailable in visionOS` error message in `PaywallViewController`.
- Fixes the error `Symbol not found: _$s10Foundation14NSDecimalRoundyySpySo0B0aG_SPyADGSiSo14NSRoundingModeVtF`, which is an Xcode 16 bug.

# 3.7.4

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.7.4](https://github.com/superwall/Superwall-iOS/releases/tag/3.7.4)
- **Author**: yusuftor
- **Created At**: 2024-09-04T16:08:36Z

### Fixes

- Fixes rare crash caused by a Combine issue.
- Confirms the assigment to holdouts for implicit placements like `paywall_decline`.
- Tracks the `trigger_fire` event for implicit placements.

# 3.7.3

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.7.3](https://github.com/superwall/Superwall-iOS/releases/tag/3.7.3)
- **Author**: yusuftor
- **Created At**: 2024-08-21T11:14:09Z

### Fixes

- Fixes issue with decoding custom placements from paywalls.

# 3.7.2

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.7.2](https://github.com/superwall/Superwall-iOS/releases/tag/3.7.2)
- **Author**: yusuftor
- **Created At**: 2024-08-16T14:31:33Z

### Fixes

- Changes access level of a property used by our Flutter and React Native wrapper SDKs.

# 3.7.1

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.7.1](https://github.com/superwall/Superwall-iOS/releases/tag/3.7.1)
- **Author**: yusuftor
- **Created At**: 2024-08-13T13:51:22Z

### Enhancements

- Adds a `custom_placement` event that you can attach to any element in the paywall with a dictionary of parameters. When the element is tapped, the event will be tracked. The name of the placement can be used to trigger a paywall and its params used in audience filters.
- Tracks a `config_attributes` event after calling `Superwall.configure`, which contains info about the configuration of the SDK. This gets tracked whenever you set the delegate.
- Adds in device attributes tracking after setting the interface style override.
- Adds `close_reason` to `PaywallInfo` properties.

# 3.7.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.7.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.7.0)
- **Author**: yusuftor
- **Created At**: 2024-07-31T09:37:04Z

### Enhancements

- Adds support for multiple paywall URLs, incase one CDN provider fails.
- Adds the ability for the SDK to refresh the Superwall configuration every session start, subject to a feature flag. This means the paywalls will be kept updated even if the app has been open for a long time in the background.
- Adds `build_id` and `cache_key` to `PaywallInfo`.
- Tracks a `config_refresh` Superwall event when the configuration is refreshed.
- Adds product retrying if we fail to fetch an `SKProduct`. This tracks a `paywallProductsLoad_retry` event whenever the product loading request gets retried.
- SW-2899: Adds `Superwall.shared.localeIdentifier` as a convenience variable that you can use to dynamically update the locale used for evaluating rules and getting localized paywalls.
- Adds feature flag to enable text interaction with a paywall.
- SW-2901: Adds `abandoned_product_id` to a `transaction_abandon` event to use in audience filters. You can use this to show a paywall if a user abandons the transaction for a specific product.
- Updates RevenueCat example app to use v5 of their SDK.

### Fixes

- Fixes error message `undefined is not an object` that sometimes appeared when opening a paywall.
- SW-2871: Makes sure to track device attributes after geo location data is found.
- Fixes issue where restored transactions were being finished even if a `PurchaseController` was supplied in configure.
- SW-2879: Adds `capabilities` to device attributes. This is a comma-separated list of capabilities the SDK has that you can target in audience filters. This release adds the `paywall_event_receiver` capability. This indicates that the paywall can receive transaction and restore events from the SDK.
- SW-2879: Adds `configCapabilties` which contains a `name` of the capability and any additional info. The `paywall_event_receiver` capability contains a list of eventNames specifying the exact events paywalljs can receive.
- Fixes a crash caused by an arithmetic overflow if there was an issue with audience filter limits.
- Fixes `UIScreen unavailable in visionOS` error message in `PaywallViewController`.

# 3.6.6

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.6.6](https://github.com/superwall/Superwall-iOS/releases/tag/3.6.6)
- **Author**: yusuftor
- **Created At**: 2024-06-12T17:03:54Z

### Enhancements

- SW-2804: Exposes a `presentation` property on the `PaywallInfo` object. This contains information about the presentation of the paywall.
- Adds `restore_start`, `restore_complete`, and `restore_fail` events.
- SW-2850: Adds error message to `paywallWebviewLoad_fail`.
- SW-2851: Adds error message to `paywallProductsLoad_fail`.
- SW-2783: Logs error when trying to purchase a product that has failed to load.

### Fixes

- Makes sure the formatting of SK2 product variables use the same locale as the product.

# 3.6.5

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.6.5](https://github.com/superwall/Superwall-iOS/releases/tag/3.6.5)
- **Author**: yusuftor
- **Created At**: 2024-05-28T21:40:02Z

### Enhancements

- Adds `enable_webview_process_pool`, `enable_suppresses_incremental_rendering`, `enable_throttle_scheduling_policy`, `enable_none_scheduling_policy` as feature flags for the webview configuration.

# 3.6.4

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.6.4](https://github.com/superwall/Superwall-iOS/releases/tag/3.6.4)
- **Author**: yusuftor
- **Created At**: 2024-05-28T14:43:43Z

### Enhancements

- Tweaks to webview configuration for performance improvements.

### Fixes

- Fixes bug where paywall background wasn't being set.

# 3.6.3

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.6.3](https://github.com/superwall/Superwall-iOS/releases/tag/3.6.3)
- **Author**: yusuftor
- **Created At**: 2024-05-24T19:07:04Z

### Enhancements

- SW-2828: Adds the Superwall `appUserId` as the `applicationUsername` for internal `SKPayments`.
- SW-2817: Adds support for dark mode paywall background color.
- SW-2815: Adds ability to target devices based on their IP address location. Use `device.ipRegion`, `device.ipRegionCode`, `device.ipCountry`, `device.ipCity`, `device.ipContinent`, or `device.ipTimezone`.
- Paywalls built with the new editor can be downloaded as webarchive files. This allows for shared resources and faster loading times for paywalls.

### Fixes

- Fixes issue where implicit triggers weren't sending a `paywallPresentationRequest` when they didn't result in a paywall. Now this applies only to implicit triggers that are derived from an action on the paywall, like `paywall_decline`.

# 3.6.2

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.6.2](https://github.com/superwall/Superwall-iOS/releases/tag/3.6.2)
- **Author**: yusuftor
- **Created At**: 2024-05-09T00:46:29Z

### Enhancements

- Tracks an `identity_alias` event whenever identify is called to alias Superwall's anonymous ID with a developer provided id.
- Adds `setInterfaceStyle(to:)` which can be used to override the system interface style.
- Adds `device.interfaceStyleMode` to the device template, which can be `automatic` or `manual` if overriding the interface style.

### Fixes

- Changes the `$feature_gating` parameter in `PaywallInfo` from 0 and 1 to `GATED` and `NON_GATED` to prevent confusion.
- Fixes issue where feature gating wasn't working correctly when an implicit event triggered by `paywall_decline`, `transaction_fail`, `transaction_abandon`, or `survey_response` was resulting in a `skipped` `PaywallState`.
- Fixes issue where a `transaction_abandon` implicit event that resulted in a `skipped` `PaywallState` was accidentally closing a paywall when it shouldn't have.

# 3.6.1

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.6.1](https://github.com/superwall/Superwall-iOS/releases/tag/3.6.1)
- **Author**: yusuftor
- **Created At**: 2024-04-16T16:36:44Z

### Enhancements

- Adds privacy manifest.

# 3.6.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.6.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.6.0)
- **Author**: yusuftor
- **Created At**: 2024-04-05T22:55:44Z

### Enhancements

- Adds support for unlimited products in a paywall.
- SW-2767: Adds `device.regionCode` and `device.preferredRegionCode`, which returns the `regionCode` of the locale. For example, if a locale is `en_GB`, the `regionCode` will be `GB`. You can use this in the filters of your campaign.
- Adds ability to specify custom API endpoints using `SuperwallOptions` to facilitate local testing more easily.

### Fixes

- Calls the completion block even if Superwall.configure is called more than once.
- `getPresentationResult` now confirms assignments for holdouts.

# 3.5.0

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.5.0](https://github.com/superwall/Superwall-iOS/releases/tag/3.5.0)
- **Author**: yusuftor
- **Created At**: 2024-02-29T23:41:14Z

### Enhancements

- Adds visionOS support.

### Fixes

- Moves resources into their own resources bundle when installing via CocoaPods.

# 3.5.0-rc.3

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.5.0-rc.3](https://github.com/superwall/Superwall-iOS/releases/tag/3.5.0-rc.3)
- **Author**: yusuftor
- **Created At**: 2024-02-26T03:44:25Z

### Fixes

- Moves resources into their own resources bundle when installing via CocoaPods.

# 3.5.0-rc.1

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.5.0-rc.1](https://github.com/superwall/Superwall-iOS/releases/tag/3.5.0-rc.1)
- **Author**: anglinb
- **Created At**: 2024-02-04T01:17:41Z

This is our first visionOS pre-release, we'll test this on a few devices to
ensure everything works as expected!

### Enhancements
 
- Adds support for visionOS!

# 3.4.8

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.4.8](https://github.com/superwall/Superwall-iOS/releases/tag/3.4.8)
- **Author**: yusuftor
- **Created At**: 2024-01-24T22:01:30Z

Note: This version is the same as 3.4.7, we just needed to update the version number to publish to cocoapods!

### Enhancements

- SW-2667: Adds `preferredLanguageCode` and `preferredLocale` to device attributes. If your app isn't already localized for a language you're trying to target, the `deviceLanguageCode` and `deviceLocale` may not be what you're expecting. Use these device attributes instead to access the first preferred locale the user has in their device settings.

### Fixes

- Fixes bug where a `transaction_abandon` or `transaction_fail` event would prevent the presented paywall from dismissing if `paywall_decline` was a trigger.
- SW-2678: Fixes issue where the `subscription_start` event was being fired even if a non-recurring product was purchased.
- SW-2659: Fixes issue on macOS where the window behind a paywall wasn't being removed when a paywall was dismissed, leading to the app appearing to be in a frozen state.

# 3.4.7

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.4.7](https://github.com/superwall/Superwall-iOS/releases/tag/3.4.7)
- **Author**: yusuftor
- **Created At**: 2024-01-24T20:14:15Z

### Enhancements

- SW-2667: Adds `preferredLanguageCode` and `preferredLocale` to device attributes. If your app isn't already localized for a language you're trying to target, the `deviceLanguageCode` and `deviceLocale` may not be what you're expecting. Use these device attributes instead to access the first preferred locale the user has in their device settings.

### Fixes

- Fixes bug where a `transaction_abandon` or `transaction_fail` event would prevent the presented paywall from dismissing if `paywall_decline` was a trigger.
- SW-2678: Fixes issue where the `subscription_start` event was being fired even if a non-recurring product was purchased.
- SW-2659: Fixes issue on macOS where the window behind a paywall wasn't being removed when a paywall was dismissed, leading to the app appearing to be in a frozen state.

# 3.4.6

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.4.6](https://github.com/superwall/Superwall-iOS/releases/tag/3.4.6)
- **Author**: yusuftor
- **Created At**: 2024-01-04T18:01:35Z

### Enhancements

- Adds internal code for SDK wrappers like Flutter.

# 3.4.5

### Release info
- **URL**: [https://github.com/superwall/Superwall-iOS/releases/tag/3.4.5](https://github.com/superwall/Superwall-iOS/releases/tag/3.4.5)
- **Author**: yusuftor
- **Created At**: 2023-12-11T21:41:41Z

### Enhancements

- Adds internal feature flag to disable verbose events like `paywallResponseLoad_start`.
- Tracks a Superwall Event `reset` whenever `Superwall.shared.reset()` is called.

### Fixes

- Fixes issue where holdouts were still matching even if the limit set for their corresponding rules were exceeded.
- Fixes potential crash if the free trial notification delay was set to zero seconds.

