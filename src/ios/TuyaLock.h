#import <Cordova/CDV.h>

@interface TuyaLock : CDVPlugin
- (void)setTimeout:(CDVInvokedUrlCommand*)command;
- (void)clearTimeout:(CDVInvokedUrlCommand*)command;
@end
