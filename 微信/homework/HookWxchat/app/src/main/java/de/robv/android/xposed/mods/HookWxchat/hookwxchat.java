package de.robv.android.xposed.mods.HookWxchat;

import android.util.Log;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;
public class hookwxchat implements IXposedHookLoadPackage {
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        Class clazz = lpparam.classLoader.loadClass("com.tencent.mm.pluginsdk.ui.chat.ChatFooter");
        findAndHookMethod("com.tencent.mm.pluginsdk.ui.chat.ChatFooter", lpparam.classLoader, "a", clazz, String.class, new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                Log.d("hook","chat is "+ param.args[1]);

                param.args[1] = "hi";
            }

            @Override

            protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                Log.d("hook","chat is "+ param.args[1]);
                param.args[1] = "hi";
            }
        });
    }
}
