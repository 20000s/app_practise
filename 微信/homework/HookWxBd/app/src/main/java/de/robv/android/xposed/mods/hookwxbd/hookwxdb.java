package de.robv.android.xposed.mods.hookwxbd;

import android.util.Log;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
import static de.robv.android.xposed.XposedHelpers.findAndHookMethod;
import static de.robv.android.xposed.XposedHelpers.findClass;
import static de.robv.android.xposed.XposedHelpers.findClassIfExists;

public class hookwxdb implements IXposedHookLoadPackage{
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
      //  Log.d("20000s",lpparam.packageName);
        if(!lpparam.packageName.equals("com.tencent.mm"))
            return;

        Log.d("20000s","find it!");
        Class SQL_CLAZZ = findClass("com.tencent.wcdb.database.SQLiteCipherSpec",lpparam.classLoader);
        Log.d("20000s",SQL_CLAZZ.toString());
        Class cls = findClassIfExists("com.tencent.wcdb.database.SQLiteDatabase$CursorFactory",lpparam.classLoader);

            Object CursorFactory = Proxy.newProxyInstance(lpparam.classLoader, new Class[]{cls}, new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    return null;
                }
            });

       Log.d("20000s",CursorFactory.toString());
        Class clazz = findClassIfExists("com.tencent.wcdb.DatabaseErrorHandler",lpparam.classLoader);
        Object DatabaseErrorHandler = Proxy.newProxyInstance(lpparam.classLoader, new Class[]{clazz}, new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                return null;
            }
        });
        Log.d("20000s",DatabaseErrorHandler.toString());
      /*  findAndHookMethod("com.tencent.wcdb.database.SQLiteDatabase", lpparam.classLoader, "openDatabase", String.class, byte[].class, SQL_CLAZZ, CursorFactory, int.class, DatabaseErrorHandler, int.class, new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                Log.d("20000s", param.args[0].toString());
                super.beforeHookedMethod(param);
            }
        });*/
    }
}
