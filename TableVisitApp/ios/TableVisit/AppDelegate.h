#import <RCTAppDelegate.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>
#import <UserNotifications/UNUserNotificationCenter.h>


@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@end
