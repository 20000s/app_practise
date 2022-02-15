package de.robv.android.xposed.mods.hookwxsaize;
import android.util.Log;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;
import static de.robv.android.xposed.XposedHelpers.findClass;

public class hookwxsaize implements  IXposedHookLoadPackage {

    boolean caiorsz = false;
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        Class<?> clazz =    findClass("com.tencent.mm.sdk.platformtools.bu",lpparam.classLoader);
        findAndHookMethod(clazz, "jE", Integer.class, Integer.class, new XC_MethodHook() {
            @Override
            protected void afterHookedMethod(MethodHookParam param) throws Throwable {

             Log.d("xposed",param.args[0].toString());
            }
        });

    }
}
