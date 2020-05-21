import 'package:flutter/material.dart';
import 'login_page.dart';
import 'data_provider.dart';

SharedPref sharedPref = SharedPref();
Data dt;
Future fetchGoal() async {
    dt = Data.fromJson(await sharedPref.read("Data"));
}

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // final routes = <String, WidgetBuilder>{
  //   LoginPage.tag: (context) => LoginPage(),
  // };

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PCS3443',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.teal,
        fontFamily: 'Nunito',
      ),
      darkTheme: ThemeData.dark(),
      home: LoginPage(),
      // routes: routes,
    );
  }
}