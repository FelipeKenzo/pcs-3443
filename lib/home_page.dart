import 'package:flutter/material.dart';
import 'form.dart';
import 'exercises.dart';
import 'drawer.dart';
import 'chart.dart';
import 'data_provider.dart';
import 'dart:async';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  // static const TextStyle optionStyle =
  //     TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  SharedPref sharedPref = SharedPref();
  Future<Data> dt;
  final List<Widget> _widgetOptions = <Widget>[
    Forms(),
    Exercises(),
    FChartsApp(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  void initState() {
    // dt = fetchData();
    super.initState();
    Timer.periodic(Duration(hours: 24), (timer) {
      dt = fetchData();
    });
  }

  @override
  Widget build(BuildContext context) {
    // return Scaffold(
      // body: FutureBuilder(
      //   future: dt,
      //   builder: (context, snapshot) {
      //     if (snapshot.connectionState != ConnectionState.done) {
      //       return Scaffold(
      //         body: Center(
      //           child: CircularProgressIndicator()
      //         ),
      //       );
      //     } else {
            return Scaffold(
              drawer: AppDrawer(),
              appBar: AppBar(
                title: const Text('RespireHC'),
                backgroundColor: Colors.teal[600],
                elevation: 0.0,
              ),
              body: Center(
                child: _widgetOptions.elementAt(_selectedIndex),
              ),
              bottomNavigationBar: BottomNavigationBar(
                type: BottomNavigationBarType.fixed,
                items: const <BottomNavigationBarItem>[
                  BottomNavigationBarItem(
                    icon: Icon(Icons.description),
                    title: Text('Diário'),
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(Icons.directions_run),
                    title: Text('Meta diária'),
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(Icons.history),
                    title: Text('Histórico'),
                  ),
                  // BottomNavigationBarItem(
                  //   icon: Icon(Icons.equalizer),
                  //   title: Text('DataDisplay'),
                  // ),
                ],
                currentIndex: _selectedIndex,
                selectedItemColor: Colors.amber[800],
                onTap: _onItemTapped,
              ),
            );
      //     }
      //   }
      // )
    // );
  }
}