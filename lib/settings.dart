import 'package:flutter/material.dart';
import 'package:settings_ui/settings_ui.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'dart:async';
import 'login_page.dart';
import 'languages_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

class SettingsScreen extends StatefulWidget {
  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool lockInBackground = true;

  Future logout() async {
    FirebaseAuth.instance.signOut();

    // delete sharedpreferences files
    SharedPreferences preferences = await SharedPreferences.getInstance();
    await preferences.clear();

    Navigator.pushReplacement(
      context, 
      MaterialPageRoute(
        builder: (context) => LoginPage() 
      )
    );
  }

  Future Identificador() async {
    final FirebaseUser user = await FirebaseAuth.instance.currentUser();
    if (user != null) {
      user.getIdToken().then((token) async {
        const url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BLT8&redirect_uri=https://1ydxeyszp4.execute-api.sa-east-1.amazonaws.com/Beta/auth&scope=activity%20heartrate&expires_in=31536000&state=";
        if (await canLaunch(url+ user.email)) {
          await launch(url+ user.email);
            } else {
        throw 'Could not launch';
        }
        print("https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BLT8&redirect_uri=https://1ydxeyszp4.execute-api.sa-east-1.amazonaws.com/Beta/auth&scope=activity%20heartrate&expires_in=31536000&state=" + user.email);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: SettingsList(
        sections: [
          SettingsSection(
            title: 'Common',
            tiles: [
              SettingsTile(
                title: 'Language',
                subtitle: 'English',
                leading: Icon(Icons.language),
                onTap: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (BuildContext context) => LanguagesScreen()));
                },
              ),
              SettingsTile(
                  title: 'Environment',
                  subtitle: 'Production',
                  leading: Icon(Icons.cloud_queue)),
            ],
          ),
          SettingsSection(
            title: 'Account',
            tiles: [
              SettingsTile(title: 'Phone number', leading: Icon(Icons.phone)),
              SettingsTile(title: 'Email', leading: Icon(Icons.email)),
              SettingsTile(title: 'Sign out', leading: Icon(Icons.exit_to_app), onTap: () => logout(),),
              SettingsTile(title: 'Data', leading: Icon(Icons.tablet_android), onTap: () => Identificador()),
            ],
          ),
          SettingsSection(
            title: 'Secutiry',
            tiles: [
              SettingsTile.switchTile(
                title: 'Lock app in background',
                leading: Icon(Icons.phonelink_lock),
                switchValue: lockInBackground,
                onToggle: (bool value) {
                  setState(() {
                    lockInBackground = value;
                  });
                },
              ),
              SettingsTile.switchTile(
                  title: 'Use fingerprint',
                  leading: Icon(Icons.fingerprint),
                  onToggle: (bool value) {},
                  switchValue: false),
              SettingsTile.switchTile(
                title: 'Change password',
                leading: Icon(Icons.lock),
                switchValue: true,
                onToggle: (bool value) {},
              ),
            ],
          ),
          SettingsSection(
            title: 'Misc',
            tiles: [
              SettingsTile(
                  title: 'Terms of Service', leading: Icon(Icons.description)),
              SettingsTile(
                  title: 'Open source licenses',
                  leading: Icon(Icons.collections_bookmark)),
            ],
          )
        ],
      ),
    );
  }
}