package de.robv.android.xposed.mods.hookwxlog;

import android.util.Log;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;
public class hookwxlog implements IXposedHookLoadPackage{
    static String TAG = "HookXLog";
    static public void keep_setupXLog(XC_LoadPackage.LoadPackageParam lpparam){

        findAndHookMethod("com.tencent.mm.xlog.app.XLogSetup", lpparam.classLoader, "keep_setupXLog", boolean.class, String.class,
                String.class, Integer.class, Boolean.class, Boolean.class, String.class, new XC_MethodHook() {
                    @Override
                    protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                        param.args[5] = true;
                        //super.beforeHookedMethod(param);
                    }

                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        param.args[5]= true;
                        super.afterHookedMethod(param);
                        Log.d("hook","XLogSetup arge[5] = " + param.args[5]);
                        Log.d("hook",param.args[1] +"");
                        Log.d("hook",param.args[2] + "");
                    }
                });

    }
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        keep_setupXLog(lpparam);

    }

}