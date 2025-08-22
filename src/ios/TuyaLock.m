#import "TuyaLock.h"

@implementation TuyaLock {
    NSMutableDictionary<NSNumber *, dispatch_block_t> *timers;
}

- (void)pluginInitialize {
    timers = [NSMutableDictionary dictionary];
}

- (void)setTimeout:(CDVInvokedUrlCommand*)command {
    NSNumber *timerId = [command.arguments objectAtIndex:0];
    int delayMs = [[command.arguments objectAtIndex:1] intValue];

    dispatch_block_t block = dispatch_block_create(0, ^{
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        [self->timers removeObjectForKey:timerId];
    });

    timers[timerId] = block;

    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayMs * NSEC_PER_MSEC)), dispatch_get_main_queue(), block);
}

- (void)clearTimeout:(CDVInvokedUrlCommand*)command {
    NSNumber *timerId = [command.arguments objectAtIndex:0];
    dispatch_block_t block = timers[timerId];
    if (block) {
        dispatch_block_cancel(block);
        [timers removeObjectForKey:timerId];
    }
}

@end
