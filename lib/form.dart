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

  final acordar = SelectFieldBloc(
    name: 'acordar',
    items: ['nunca', 'quase nunca', 'poucas vezes', 'várias vezes', 'muitas vezes', 'muitíssimas vezes', 'incapaz de dormir devido a asma'],
  );

  final intensidade = SelectFieldBloc(
    name: 'intensidade',
    items: ['sem sintomas', 'sintomas muito leves', 'sintomas leves', 'sintomas moderados', 'sintomas um tanto graves', 'sintomas graves', 'sintomas muito graves'],
  );

  final limitado = SelectFieldBloc(
    name: 'limitado',
    items: ['nada limitado', 'muito pouco limitado', 'pouco limitado', 'moderadamente limitado', 'muito limitado', 'extremamente limitado', 'totalmente limitado'],
  );

  final falta_de_ar = SelectFieldBloc(
    name: 'falta_de_ar',
    items: ['nenhuma', 'muito pouca', 'alguma', 'moderada', 'bastante', 'muita', 'muitíssima'],
  );

  final chiado = SelectFieldBloc(
    name: 'chiado',
    items: ['nunca', 'quase nunca', 'pouco tempo', 'algum tempo', 'bastante tempo', 'quase sempre', 'sempre'],
  );

  final jatos = SelectFieldBloc(
    name: 'jatos',
    items: ['nenhum', '1-2 jatos na maior parte dos dias', '3-4 jatos na maior parte dos dias', '5-8 jatos na maior parte dos dias', '9-12 jatos na maior parte dos dias',
    '13-16 jatos na maior parte dos dias', 'Mais de 16 jatos por dia'],
  );

  final vef1 = SelectFieldBloc(
    name: 'vef1',
    items: ['> 95% do previsto', '95-90% do previsto', '89-80% do previsto', '79-70% do previsto', '69-60% do previsto',
    '59-50% do previsto', '< 50% do previsto'],
  );

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

  var _acordar = ['nunca', 'quase nunca', 'poucas vezes', 'várias vezes', 'muitas vezes', 'muitíssimas vezes', 'incapaz de dormir devido a asma'];
  var _vef1 = ['> 95% do previsto', '95-90% do previsto', '89-80% do previsto', '79-70% do previsto', '69-60% do previsto',
    '59-50% do previsto', '< 50% do previsto'];
  var _jatos = ['nenhum', '1-2 jatos na maior parte dos dias', '3-4 jatos na maior parte dos dias', '5-8 jatos na maior parte dos dias', '9-12 jatos na maior parte dos dias',
    '13-16 jatos na maior parte dos dias', 'Mais de 16 jatos por dia'];
  var _chiado = ['nunca', 'quase nunca', 'pouco tempo', 'algum tempo', 'bastante tempo', 'quase sempre', 'sempre'];
  var _falta_de_ar = ['nenhuma', 'muito pouca', 'alguma', 'moderada', 'bastante', 'muita', 'muitíssima'];
  var _limitado = ['nada limitado', 'muito pouco limitado', 'pouco limitado', 'moderadamente limitado', 'muito limitado', 'extremamente limitado', 'totalmente limitado'];
  var _intensidade = ['sem sintomas', 'sintomas muito leves', 'sintomas leves', 'sintomas moderados', 'sintomas um tanto graves', 'sintomas graves', 'sintomas muito graves'];

  SerializedFormBloc() {
    if(DateTime.now().weekday == 3) {
      addFieldBlocs(
        fieldBlocs: [
          multiSelect1,
          name,
          acordar,
          intensidade,
          limitado,
          falta_de_ar,
          chiado,
          jatos,
          vef1,
          _date,
        ],
      );
    } else {
      addFieldBlocs(
        fieldBlocs: [
          multiSelect1,
          name,
          // gender,
          _date,
        ],
      );
    }
  }

  @override
  void onSubmitting() async {
    // var res = state.toJson();
    // var res = JsonEncoder.withIndent("").convert(state.toJson());
    // print(JsonEncoder.withIndent("").convert(state.toJson()));
    // print("resultado forms: ${state.toJson()}");
    // print("resultado acordar: ${state.toJson()['acordar']}");
    // print(jsonEncode(res));
    // print(jsonEncode(res).runtimeType);
    var res = state.toJson();
    if(DateTime.now().weekday == 3) {
      res['acq'] = [0, 0, 0, 0, 0, 0, 0];
      for (int i = 0; i < 7; i++) {
        // print(res['acordar']);
        // print("array: ${_acordar[6]}");
        if (res['acordar'] == _acordar[i]) res['acq'][0] = i;
        if (res['intensidade'] == _intensidade[i]) res['acq'][1] = i;
        if (res['limitado'] == _limitado[i]) res['acq'][2] = i;
        if (res['falta_de_ar'] == _falta_de_ar[i]) res['acq'][3] = i;
        if (res['chiado'] == _chiado[i]) res['acq'][4] = i;
        if (res['jatos'] == _jatos[i]) res['acq'][5] = i;
        if (res['vef1'] == _vef1[i]) res['acq'][6] = i;
      }
      res.remove('acordar');
      res.remove('intensidade');
      res.remove('limitado');
      res.remove('falta_de_ar');
      res.remove('chiado');
      res.remove('jatos');
      res.remove('vef1');
    }
    // await sendQuiz(res);
    sendForms(res).then((value) {
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

          if(DateTime.now().weekday == 3) {
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
                          new ListTile(
                            title: new Text("Em média, durante os últimos sete dias, o quão frequentemente você se acordou por causa de sua asma, durante a noite?", textAlign: TextAlign.justify),
                          ),
                          //Text("Em média, durante os últimos sete dias, o quão frequentemente você se acordou por causa de sua asma, durante a noite?", textAlign: TextAlign.justify),
                          RadioButtonGroupFieldBlocBuilder<String>(
                            selectFieldBloc: formBloc.acordar,
                            itemBuilder: (context, value) =>
                                value[0].toUpperCase() + value.substring(1),
                            decoration: InputDecoration(
                              // labelText: 'acordar',
                              prefixIcon: SizedBox(),
                            ),
                          ),
                          Divider(),
                          new ListTile(
                            title: new Text("Em média, durante os últimos sete dias, o quão ruins foram os seus sintomas da asma, quando você acordou pela manhã?", textAlign: TextAlign.justify),
                          ),
                          //Text("Em média, durante os últimos sete dias, o quão ruins foram os seus sintomas da asma, quando você acordou pela manhã?", textAlign: TextAlign.justify),
                          RadioButtonGroupFieldBlocBuilder<String>(
                            selectFieldBloc: formBloc.intensidade,
                            itemBuilder: (context, value) =>
                                value[0].toUpperCase() + value.substring(1),
                            decoration: InputDecoration(
                              // labelText: 'intensidade',
                              prefixIcon: SizedBox(),
                            ),
                          ),
                          Divider(),
                          new ListTile(
                            title: new Text("De um modo geral, durante os últimos sete dias, o quão limitado você tem estado em suas atividades por causa de sua asma?", textAlign: TextAlign.justify),
                          ),
                          //Text("De um modo geral, durante os últimos sete dias, o quão limitado você tem estado em suas atividades por causa de sua asma?", textAlign: TextAlign.justify),
                          RadioButtonGroupFieldBlocBuilder<String>(
                            selectFieldBloc: formBloc.limitado,
                            itemBuilder: (context, value) =>
                                value[0].toUpperCase() + value.substring(1),
                            decoration: InputDecoration(
                              // labelText: 'media',
                              prefixIcon: SizedBox(),
                            ),
                          ),
                          Divider(),
                          new ListTile(
                            title: new Text("De um modo geral, durante os últimos sete dias, o quanto de falta de ar você teve por causa de sua asma?", textAlign: TextAlign.justify),
                          ),
                          //Text("De um modo geral, durante os últimos sete dias, o quanto de falta de ar você teve por causa de sua asma?", textAlign: TextAlign.justify),
                          RadioButtonGroupFieldBlocBuilder<String>(
                            selectFieldBloc: formBloc.falta_de_ar,
                            itemBuilder: (context, value) =>
                                value[0].toUpperCase() + value.substring(1),
                            decoration: InputDecoration(
                              // labelText: 'media',
                              prefixIcon: SizedBox(),
                            ),
                          ),
                          Divider(),
                          new ListTile(
                            title: new Text("De um modo geral, durante os últimos sete dias, quanto tempo você teve chiado?", textAlign: TextAlign.justify),
                          ),
                          //Text("De um modo geral, durante os últimos sete dias, quanto tempo você teve chiado?", textAlign: TextAlign.justify),
                          RadioButtonGroupFieldBlocBuilder<String>(
                            selectFieldBloc: formBloc.chiado,
                            itemBuilder: (context, value) =>
                                value[0].toUpperCase() + value.substring(1),
                            decoration: InputDecoration(
                              // labelText: 'media',
                              prefixIcon: SizedBox(),
                            ),
                          ),
                          Divider(),
                          new ListTile(
                            title: new Text("Em média, durante os últimos sete dias, quantos jatos de broncodilatador de resgate (Sabutamol, Fenoterol, etc) você usou por dia?", textAlign: TextAlign.justify),
                          ),
                          //Text("Em média, durante os últimos sete dias, quantos jatos de broncodilatador de resgate (Sabutamol, Fenoterol, etc) você usou por dia?", textAlign: TextAlign.justify),
                          RadioButtonGroupFieldBlocBuilder<String>(
                            selectFieldBloc: formBloc.jatos,
                            itemBuilder: (context, value) =>
                                value[0].toUpperCase() + value.substring(1),
                            decoration: InputDecoration(
                              // labelText: 'media',
                              prefixIcon: SizedBox(),
                            ),
                          ),
                          Divider(),
                          new ListTile(
                            title: new Text("VEF1 pré broncodilatador ______ VEF1 previsto ______ VEF1 % previsto", textAlign: TextAlign.justify),
                          ),
                          //Text("VEF1 pré broncodilatador ______ VEF1 previsto ______ VEF1 % previsto", textAlign: TextAlign.justify),
                          RadioButtonGroupFieldBlocBuilder<String>(
                            selectFieldBloc: formBloc.vef1,
                            itemBuilder: (context, value) =>
                                value[0].toUpperCase() + value.substring(1),
                            decoration: InputDecoration(
                              // labelText: 'media',
                              prefixIcon: SizedBox(),
                            ),
                          ),
                          Divider(),
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
          } else {
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
                          //   selectFieldBloc: formBloc.media,
                          //   itemBuilder: (context, value) =>
                          //       value[0].toUpperCase() + value.substring(1),
                          //   decoration: InputDecoration(
                          //     labelText: 'media',
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
          }
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
              'Enviado',
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
