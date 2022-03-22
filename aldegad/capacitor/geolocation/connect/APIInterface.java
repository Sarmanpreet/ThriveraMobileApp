package com.aldegad.capacitor.geolocation.connect;

import java.util.Map;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PartMap;
import retrofit2.http.Url;
import retrofit2.http.Body;
import retrofit2.http.Header;


public interface APIInterface {

    @POST
    Call<APIResponse> run(@Url String url,@Body RequestBody params,@Header("Token") String token);
}
