import 'package:flutter/material.dart';
import 'settings.dart';

class AppDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            // child: Text(
            //   'Side menu',
            //   style: TextStyle(color: Colors.white, fontSize: 25),
            // ),
            child: Image.asset(
              'assets/logo.png',
            ),
            decoration: BoxDecoration(
                color: Colors.cyan[50],
                // image: DecorationImage(
                //     fit: BoxFit.fill,
                //     image: AssetImage('assets/images/cover.jpg'))
            ),
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('Settings'),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(context, new MaterialPageRoute(builder: (BuildContext context) => new SettingsScreen()));
            },
          ),
          ListTile(
            leading: Icon(Icons.help_outline),
            title: Text('FAQ'),
            onTap: () {
              Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }
}