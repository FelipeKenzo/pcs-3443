import 'package:flutter/material.dart';
import 'package:splashscreen/splashscreen.dart';
import 'package:pcs3443/home_page.dart';
import 'data_provider.dart';

class SpScreen extends StatefulWidget {
  @override
  _SpScreenState createState() => new _SpScreenState();
}

class _SpScreenState extends State<SpScreen> {
  @override
  void initState() {
    fetchData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return new SplashScreen(
      seconds: 5,
      navigateAfterSeconds: new HomePage(),
      title: new Text('RespireHC',
        style: new TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 20.0
        ),
      ),
      image: new Image.asset('assets/logo.png'),
      gradientBackground: new LinearGradient(colors: [Colors.cyan, Colors.blue], begin: Alignment.topLeft, end: Alignment.bottomRight),
      backgroundColor: Colors.white,
      styleTextUnderTheLoader: new TextStyle(),
      photoSize: 100.0,
      // onClick: ()=>print("Flutter Egypt"),
      loaderColor: Colors.red,
    );
  }
}