import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:intl/intl.dart';

final dateFormatter = DateFormat('yyyy-MM-dd');

Future sendForms(dynamic st) async {
  // await FirebaseAuth
  // .instance
  // .signInWithEmailAndPassword(email: "pac1@email.com", password: "senha1234");
  final FirebaseUser user = await FirebaseAuth.instance.currentUser();
  if (user != null) {
    // user.getIdToken().then((token) async {
      // final idToken = token.token;
      // final header = 'Bearer $idToken';
      // var date = dateFormatter.format(DateTime.now())
    final file = await Firestore.instance
    .collection('Paciente')
    .document(user.email)
    .collection('Diario')
    .where('date', isEqualTo: dateFormatter.format(DateTime.now()))
    .limit(1)
    .getDocuments();

    final len = file.documents.length;
    print(len);
    if (len == 1) {
      return Future.value(false);
    }
    // print(user.email);
    await Firestore.instance
    .collection('Paciente')
    .document(user.email)
    .collection('Diario')
    .add(st);
    return Future.value(true);
    // });
  }
}

// void main() => runApp(SendData());

// class SendData extends StatefulWidget {
//   SendData({Key key}) : super(key: key);

//   @override
//   _SendDataState createState() => _SendDataState();
// }

// class _SendDataState extends State<SendData> {
//   @override
//   void initState() {
//     super.initState();
//     updateForms();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Welcome to Flutter',
//       home: Scaffold(
//         appBar: AppBar(
//           title: Text('Welcome to Flutter'),
//         ),
//         body: Center(
//           child: Text('Hello World'),
//         ),
//       ),
//     );
//   }
// }