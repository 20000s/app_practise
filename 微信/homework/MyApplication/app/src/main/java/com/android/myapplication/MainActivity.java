package com.android.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        int.
       /* if(getIntent().getAction().equals("exp")){
            Uri data = getIntent().getData();
            try{
                InputStream i = getContentResolver().openInputStream(data);
                byte[] buffer = new byte[1000];


            }catch (IOException e){
        }*/
        System.out.println("hello");
    }
}