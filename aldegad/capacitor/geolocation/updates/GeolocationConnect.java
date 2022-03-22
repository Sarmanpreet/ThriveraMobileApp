package com.aldegad.capacitor.geolocation.updates;

import android.util.Log;

import com.aldegad.capacitor.geolocation.connect.API;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;

import okhttp3.MediaType;
import okhttp3.RequestBody;

public class GeolocationConnect {
    private static String TAG = "aldegad.Gecolocation.GeolocationConnect";

    public static void uploadUpdates(GeolocationConnectOptions options, double longitude, double latitude) {
        Log.d(TAG, "uploadUpdates: " + longitude + " & " + latitude);
        Log.d(TAG, "uploadUpdates: " + options.url);
        Log.d(TAG, "uploadUpdates: " + options.body);
        Log.d(TAG, "uploadUpdates: " + options.token);

        if(options.url != null && options.url != "") {
            HashMap<String, RequestBody> params = new HashMap<>();
          MediaType Json=MediaType.parse("application/json;charset=utf-8");
            JSONObject data=new JSONObject();
            if(options.body != null) {
                Iterator<String> keys = options.body.keys();
                 while(keys.hasNext()) {
                    String key = keys.next();
                    String value = options.body.getString(key);
                    if(value.indexOf("@longitude") > -1) {
                        value = value.replaceAll("@longitude", ""+longitude);
                    }
                    if(value.indexOf("@latitude") > -1) {
                        value = value.replaceAll("@latitude", ""+latitude);
                    }
                   if(value.indexOf("true") > -1) {
                     try {
                       data.put("isSP", true);
                     }
                     catch (JSONException e)
                     {
                       Log.d(TAG, "error jsonobj: ");
                       e.printStackTrace();
                     }

                   }
                   else
                   {
                     try {
                       data.put(key, value);
                     }
                     catch (JSONException e)
                     {
                       Log.d(TAG, "error jsonobj: ");
                       e.printStackTrace();
                     }
                   }
                    Log.d(TAG, "param: " + key + " & " + value);

                   // params.put(key, RequestBody.create(MediaType.parse("text/plain"), value));
                    Log.d(TAG, "param after: "+ data);

                }
            } else {
                params.put("nothing", RequestBody.create(MediaType.parse("text/plain"), ""));
            }
          RequestBody body=RequestBody.create(Json,data.toString());
            API.run(options.url, body,options.token,
                    response -> {                    });

        }
    }
}
