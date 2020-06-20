import 'package:flutter/material.dart';

class MyBullet extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return new Container(
    height: 20.0,
    width: 20.0,
    decoration: new BoxDecoration(
    color: Colors.black,
    shape: BoxShape.circle,
  ),
  );
  }
}

class Treino extends StatefulWidget {
  @override
  _Treino createState() => _Treino();
}

class _Treino extends State<Treino> {
  @override
  Widget build(BuildContext context) {

    Widget Introducao = Container(
      padding: const EdgeInsets.all(32),
      child: Column(
        children: <Widget>[
          new ListTile(
          title: new Text('A atividade física traz diversos benefícios para o tratamento da asma, como:'),
          ),
          new ListTile(
          leading: new MyBullet(),
          title: new Text('Reconhecido como um dos pilares da reabilitação pulmonar'),
          ),
          new ListTile(
          leading: new MyBullet(),
          title: new Text('Melhora sintomas da asma'),
          ),
          new ListTile(
          leading: new MyBullet(),
          title: new Text('Diminuição do uso de corticoesteróides'),
          ),
          new ListTile(
          leading: new MyBullet(),
          title: new Text('Diminuição do uso de corticoesteróides'),
          ),
          new ListTile(
          leading: new MyBullet(),
          title: new Text('Diminuição do uso de corticoesteróides'),
          ),
          new ListTile(
          leading: new MyBullet(),
          title: new Text('Diminuição do uso de corticoesteróides'),
          ),
          new ListTile(
          title: new Text('Entretanto, para se atingir esses efeitos benéficos, o treinamento físico deve ser individualizado e ser principalmente aeróbio (de intensidade média a alta) por pelo menos 20 minutos, 2 vezes na semana e durante 4 semanas'),
          ),
          new ListTile(
          title: new Text('Algumas recomendações de exercício são:'),
          ),
        ]
      )
    );

    Widget Caminhada = Container(
      padding: const EdgeInsets.all(32),
      child: Column(
        children: <Widget>[
          new ListTile(
            title: new Text(
              'Caminhada',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Image.asset(
              'assets/Caminhada.png',
            ),
          new ListTile(
          title: new Text('A caminhada é o exercício mais recomendado, uma vez que é grátis e que pode ser realizada em diversos momentos do seu dia-a-dia. Então, caso precise fazer algo fora de casa, como compras ou trabalho, por que não ir caminhando?'),
          ),
        ]
      )
    );

    Widget Natacao = Container(
      padding: const EdgeInsets.all(32),
      child: Column(
        children: <Widget>[
          new ListTile(
            title: new Text(
              'Natação',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Image.asset(
              'assets/natacao.png',
            ),
          new ListTile(
          title: new Text('A natação é outro exercício aeróbico recomendado, entretanto, o fato de precisar de uma piscina dificulta a realização desse exercício. Caso você tenha acesso a alguma piscina, por que não nada de vez em quando?'),
          ),
        ]
      )
    );


    return Scaffold(
      appBar: AppBar(
        title: Text('Exercícios'),
      ),
        body: ListView(
          children: [
            Introducao,
            Caminhada,
            Natacao
          ],
        ),
    );
  }
}