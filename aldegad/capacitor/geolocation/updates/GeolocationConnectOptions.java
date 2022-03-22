package com.aldegad.capacitor.geolocation.updates;

import com.getcapacitor.JSObject;

public class GeolocationConnectOptions {
    public String url = null;
    public String token = null;
    public JSObject body = null;
    public GeolocationConnectOptions() {}
    public GeolocationConnectOptions(JSObject options) {
        if(options != null) {
            this.url = options.getString("url") != null ? options.getString("url") : this.url;
            this.body = options.getJSObject("body") != null ? options.getJSObject("body") : this.body;
            this.token = options.getString("token") != null ? options.getString("token") : this.token;;
        }
    }
}
