import 'package:flutter/material.dart';
import 'package:pcs3443/settings.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'settings.dart';
import 'data_provider.dart';
import 'splash_screen.dart';
import 'FAQ.dart';

class LoginPage extends StatefulWidget {
  static String tag = 'login-page';
  @override
  _LoginPageState createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // final _formKey = GlobalKey<FormState>();
  SharedPref sharedPref = SharedPref();
  final email = TextEditingController(text: 'pac1@email.com');
  final password = TextEditingController(text: 'senha1234');

  @override
  Widget build(BuildContext context) {
    final logo = Hero(
      tag: 'hero',
      child: CircleAvatar(
        backgroundColor: Colors.transparent,
        radius: 48.0,
        child: Image.asset('assets/logo.png'),
      ),
    );

    final emailInput = TextFormField(
      style: TextStyle(
        color: Colors.white
      ),
      // keyboardType: TextInputType.emailAddress,
      autofocus: false,
      controller: email,
      decoration: InputDecoration(
        fillColor: Colors.black,
        hintText: 'Email',
        contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(25.0)),
      ),
      validator: (value) => value.isEmpty ? 'Email não pode ser vazio' : null,
    );

    final passwordInput = TextFormField(
      style: TextStyle(
        color: Colors.white
      ),
      autofocus: false,
      obscureText: true,
      controller: password,
      decoration: InputDecoration(
        hintText: 'Senha',
        contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(25.0)),
      ),
      validator: (value) => value.isEmpty ? 'Password não pode ser vazio' : null,
    );

    Future _buildErrorDialog(BuildContext context, _message) {
      return showDialog(
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Mensagem de erro'),
            content: Text(_message),
            actions: <Widget>[
              FlatButton(
                  child: Text('Cancelar'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  })
            ],
          );
        },
        context: context,
      );
    }

    final loginButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: RaisedButton(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        onPressed: () async {
          try {
            final FirebaseUser user = (
              await FirebaseAuth
              .instance
              .signInWithEmailAndPassword(email: email.text, password: password.text)
            ).user;
            if (user != null) {
              // await fetchData();
              Navigator.pushReplacement(
                context, 
                MaterialPageRoute(
                  builder: (context) => SpScreen()
                )
              );
            }
          } catch (error) {
              _buildErrorDialog(
                context, 
                error.message
              );
          }
        },
        padding: EdgeInsets.all(12),
        color: Colors.lightBlueAccent,
        child: Text('Log In', style: TextStyle(color: Colors.white)),
      ),
    );

    final forgotLabel = FlatButton(
      child: Text(
        'Não tenho cadastro',
        style: TextStyle(color: Colors.black54),
      ),
      onPressed: () {
        Navigator.push(
          context, 
          MaterialPageRoute(
            builder: (context) => FAQ()
          )
        );
      },
    );

    return Scaffold(
      backgroundColor: Color.fromRGBO(57, 197, 187, 1),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[
            logo,
            SizedBox(height: 48.0),
            emailInput,
            SizedBox(height: 8.0),
            passwordInput,
            SizedBox(height: 24.0),
            loginButton,
            forgotLabel
          ],
        ),
        // child: 
      ),
    );
  }
}