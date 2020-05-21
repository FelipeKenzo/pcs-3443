import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_form_bloc/flutter_form_bloc.dart';
import 'firestore.dart';
import 'package:intl/intl.dart';

final dateFormatter = DateFormat('yyyy-MM-dd');

class Forms extends StatelessWidget {
  const Forms({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SerializedForm(),
    );
  }
}

class SerializedFormBloc extends FormBloc<String, String> {
  final name = TextFieldBloc(
    name: 'obs',
  );

  // final gender = SelectFieldBloc(
  //   name: 'gender',
  //   items: ['male', 'female'],
  // );

  final _date = InputFieldBloc<String, Object>(
    name: 'date',
    initialValue: dateFormatter.format(DateTime.now()),
    // toJson: (value) => value.toUtc().toIso8601String(),
  );

  final multiSelect1 = MultiSelectFieldBloc<String, dynamic>(
    name: 'Sintomas',
    items: [
      'Tosse',
      'Chiado',
      'Falta de ar',
      'Acordar',
      'Bombinha',
    ],
  );

  SerializedFormBloc() {
    addFieldBlocs(
      fieldBlocs: [
        multiSelect1,
        name,
        // gender,
        _date,
      ],
    );
  }

  @override
  void onSubmitting() async {
    // var res = state.toJson();
    // var res = JsonEncoder.withIndent("").convert(state.toJson());
    // print(JsonEncoder.withIndent("").convert(state.toJson()));
    print(state.toJson());
    // print(jsonEncode(res));
    // print(jsonEncode(res).runtimeType);
    sendForms(state.toJson()).then((value) {
      if (value == true) {
        emitSuccess(
          canSubmitAgain: true,
          successResponse: JsonEncoder.withIndent('    ').convert(
            state.toJson(),
          ),
        );
      } else {
        emitFailure();
      }
    });
  }
}

class SerializedForm extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => SerializedFormBloc(),
      child: Builder(
        builder: (context) {
          final formBloc = context.bloc<SerializedFormBloc>();

          return Theme(
            data: Theme.of(context).copyWith(
              inputDecorationTheme: InputDecorationTheme(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
            ),
            child: Scaffold(
              resizeToAvoidBottomInset: false,
              // appBar: AppBar(title: Text('Serialized Form')),
              floatingActionButton: FloatingActionButton(
                onPressed: formBloc.submit,
                child: Icon(Icons.send),
              ),
              body: FormBlocListener<SerializedFormBloc, String, String>(
                onSuccess: (context, state) {
                  // Scaffold.of(context).showSnackBar(SnackBar(
                  //   content: Text(state.successResponse),
                  //   duration: Duration(seconds: 2),
                  // ));
                  Navigator.of(context).pushReplacement(
                      MaterialPageRoute(builder: (_) => SuccessScreen()));
                },
                onFailure: (context, state) {
                  Scaffold.of(context).showSnackBar(SnackBar(
                    content: Text("O formulario já foi enviado hoje"),
                    duration: Duration(seconds: 2),
                  ));
                },
                child: SingleChildScrollView(
                  physics: ClampingScrollPhysics(),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: <Widget>[
                        TextFieldBlocBuilder(
                          textFieldBloc: formBloc.name,
                          keyboardType: TextInputType.emailAddress,
                          decoration: InputDecoration(
                            labelText: 'Observações',
                            prefixIcon: Icon(Icons.text_fields),
                          ),
                        ),
                        // RadioButtonGroupFieldBlocBuilder<String>(
                        //   selectFieldBloc: formBloc.gender,
                        //   itemBuilder: (context, value) =>
                        //       value[0].toUpperCase() + value.substring(1),
                        //   decoration: InputDecoration(
                        //     labelText: 'Gender',
                        //     prefixIcon: SizedBox(),
                        //   ),
                        // ),
                        // DateTimeFieldBlocBuilder(
                        //   dateTimeFieldBloc: formBloc._date,
                        //   format: DateFormat('dd-mm-yyyy'),
                        //   initialDate: DateTime.now(),
                        //   firstDate: DateTime(1900),
                        //   lastDate: DateTime(2100),
                        //   decoration: InputDecoration(
                        //     labelText: 'Data',
                        //     prefixIcon: Icon(Icons.calendar_today),
                        //   ),
                        // ),
                        CheckboxGroupFieldBlocBuilder<String>(
                          multiSelectFieldBloc: formBloc.multiSelect1,
                          itemBuilder: (context, item) => item,
                          decoration: InputDecoration(
                            labelText: 'Sintomas',
                            prefixIcon: SizedBox(),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

// class LoadingDialog extends StatelessWidget {
//   static void show(BuildContext context, {Key key}) => showDialog<void>(
//         context: context,
//         useRootNavigator: false,
//         barrierDismissible: false,
//         builder: (_) => LoadingDialog(key: key),
//       ).then((_) => FocusScope.of(context).requestFocus(FocusNode()));

//   static void hide(BuildContext context) => Navigator.pop(context);

//   LoadingDialog({Key key}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return WillPopScope(
//       onWillPop: () async => false,
//       child: Center(
//         child: Card(
//           child: Container(
//             width: 80,
//             height: 80,
//             padding: EdgeInsets.all(12.0),
//             child: CircularProgressIndicator(),
//           ),
//         ),
//       ),
//     );
//   }
// }

class SuccessScreen extends StatelessWidget {
  SuccessScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(Icons.check, size: 100),
            SizedBox(height: 10),
            Text(
              'Success',
              style: TextStyle(fontSize: 54, color: Colors.black),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 10),
            // RaisedButton.icon(
            //   onPressed: () => Navigator.of(context).pushReplacement(
            //       MaterialPageRoute(builder: (_) => SerializedForm())),
            //   // onPressed: () => print("salvado"),
            //   icon: Icon(Icons.replay),
            //   label: Text('AGAIN'),
            // ),
          ],
        ),
      ),
    );
  }
}
