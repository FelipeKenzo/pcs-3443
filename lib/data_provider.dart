import 'dart:io';
import 'dart:async';
import 'dart:convert';
// import 'package:flutter/material.dart';
// import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class SharedPref {
  read(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return json.decode(prefs.getString(key));
  }

  save(String key, value) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(key, json.encode(value));
  }

  remove(String key) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove(key);
  }
}

// history steps
class Steps {
  final String steps;
  final String date;

  Steps({this.date, this.steps});

  // Map json to object
  factory Steps.fromJson(Map<String, dynamic> json) {
    return Steps(
      steps: json['steps'],
      date: json['date'],
    );
  }

  // Map object to json
  Map toJson() => {
    'steps': steps,
    'date': date
  };
}

// goal
class Goal {
  final String goal;
  final String date;

  Goal({this.date, this.goal});

  // Map json to object
  factory Goal.fromJson(Map<String, dynamic> json) {
    return Goal(
      goal: json['goal'],
      date: json['date'],
    );
  }

  // Map object to json
  Map toJson() => {
    'goal': goal,
    'date': date
  };
}

class Data {
  final String firstname;
  final String lastname;
  final String height;
  final List<Steps> history_array;
  final List<Goal> goal_array;

  Data({this.firstname, this.lastname, this.height, this.goal_array, this.history_array});

  // Map json to object
  factory Data.fromJson(Map<String, dynamic> json) {
    var list = json['history_array'] as List;
    List<Steps> stepsList = list.map((i) => Steps.fromJson(i)).toList();
    var lst = json['goal_array'] as List;
    List<Goal> stepsLst = lst.map((i) => Goal.fromJson(i)).toList();

    return Data(
      firstname: json['firstname'],
      lastname: json['lastname'],
      height: json['height'],
      goal_array: stepsLst,
      history_array: stepsList,
    );
  }

  // Map object to json
  Map toJson() {
    List<Map> ga = this.goal_array != null ? this.goal_array.map((i) => i.toJson()).toList() : null;
    List<Map> ha = this.history_array != null ? this.history_array.map((i) => i.toJson()).toList() : null;
    return {
      'firstname': this.firstname,
      'lastname': this.lastname,
      'height': this.height,
      'goal_array': ga,
      'history_array': ha
    };
  }
}

Future<Data> futureData;
Data dados;
SharedPref sharedPref = SharedPref();

Future<Data> fetchData() async {
  final FirebaseUser user = await FirebaseAuth.instance.currentUser();
  if (user != null) {
    user.getIdToken().then((token) async {
      final idToken = token.token;
      final header = 'Bearer $idToken';
      final response = await http.get(
        'https://us-central1-pcs3443-6c313.cloudfunctions.net/api/profile',
        headers: {HttpHeaders.authorizationHeader: header},
      );
      if (response.statusCode == 200) {
        print(response.body.substring(1, response.body.length-1));
        var resp = response.body.substring(1, response.body.length-1);
        // print(json.decode(response.body));
        // print(json.decode(response.body)[0]);
        Data result = new Data.fromJson(json.decode(resp));
        // print(result.history_array[0].steps);
        print(result.history_array[0].steps);
        sharedPref.save('Data', result);
        return result;
      } else {
        // If the server did not return a 200 OK response,
        // then throw an exception.
        throw Exception('Failed to load Data');
      }
    });
  }
}