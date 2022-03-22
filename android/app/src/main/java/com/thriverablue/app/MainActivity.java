package com.thriverablue.app;
import com.ahm.capacitor.camera.preview.CameraPreview;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
//import com.equimaps.capacitor_background_geolocation.BackgroundGeolocation;
import  com.aldegad.capacitor.geolocation.GeolocationPlugin;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;

import java.util.ArrayList;
public class MainActivity extends BridgeActivity {
  @Override
  public  void  onCreate(Bundle  savedInstanceState)
  {
    super.onCreate(savedInstanceState);
    registerPlugin(com.capacitorjs.plugins.device.DevicePlugin.class);
    registerPlugin(com.capacitorjs.plugins.geolocation.GeolocationPlugin.class);
    registerPlugin(com.capacitorjs.plugins.browser.BrowserPlugin.class);
   // registerPlugin(com.equimaps.capacitor_background_geolocation.BackgroundGeolocation.class);
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      //add(geolocation.class);
      add(GeolocationPlugin.class);
      add(CameraPreview.class);
    }});

  }


}
