package com.aldegad.capacitor.geolocation.connect;

import android.util.Log;

import java.util.HashMap;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class API {
    private static String TAG = "aldegad.geolocation.connect.api";
    public static String url = "https://api.thrivera.co.in/"; // default URL
    private static APIInterface apiInterface = null;

    private static void init() {
        Retrofit retrofit = new Retrofit.Builder()
            .baseUrl(url)
            .addConverterFactory(GsonConverterFactory.create())
            .build();
        apiInterface = retrofit.create(APIInterface.class);
    }

    public static void run(String url, RequestBody params,String token, APIResponseCallback responseCallback) {

        Log.d(TAG, "run.onResponse: " + "init");
        if(apiInterface == null) init();
        Log.d(TAG, "run.onResponse: " + "init:after");
        Log.d(TAG, "run.onResponse params: " + params);
      Log.d(TAG, "run.onResponse url: " + url);
        apiInterface.run(url, params,token).enqueue(new Callback<APIResponse>() {
            @Override
            public void onResponse(Call<APIResponse> call, Response<APIResponse> response) {
              //  Log.d(TAG, "run.onResponse: " + response.body().code + " / " + response.body().message + " / " + response.body().data);
              Log.d(TAG, "run.onResponse: " + response );
              responseCallback.run(response.body());
            }

            @Override
            public void onFailure(Call<APIResponse> call, Throwable t) {
                Log.d(TAG, "run.onFailure: " + t.toString());
                call.cancel();
            }
        });
    }
}

