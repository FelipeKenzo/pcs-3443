import 'package:flutter/material.dart';

class FAQ extends StatefulWidget {
  @override
  _FAQ createState() => _FAQ();
}

class _FAQ extends State<FAQ> {
  @override
  Widget build(BuildContext context) {
    Widget pergunta1 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'O que é Asma',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo1 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'A asma é uma doença crônica das vias aéreas, marcada pelo distúrbio inflamatório crônico que pode resultar em mudanças estruturais e funcionais devido hiperresponsividade dos brônquios e obstrução do fluxo de ar. ',
        softWrap: true,
      ),
    );

    Widget pergunta2 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'Por quê aumentar o nível de atividade física é bom para o tratamento da asma?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo2 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'O treinamento físico pode: melhora sintomas da asma, diminuir o uso de corticoesteróides, reduzir hiperresponsividade brônquica, reduzir os níveis de ocitocina e quimiocinas pró-inflamatórias, entre outros',
        softWrap: true,
      ),
    );

    Widget pergunta3 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'A tosse é um sintoma da asma?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo3 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'A tosse é uma reação involuntária e um dos principais sintomas da asma. Acontece mais frequentemente no período da noite ou de manhã cedo.',
        softWrap: true,
      ),
    );

    Widget pergunta4 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'O que seria o chiado no peito?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo4 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'O chiado no peito também pode ser chamado de “gatinhos no peito” ou “sibilância”, é um sintoma que acontece frequentemente quando os sintomas da asma pioram. O ruído (barulho) é agudo e acontece, principalmente, quando o ar entra nos pulmões. Isto acontece porque o tamanho dos brônquios (vias aéreas) diminui (broncoconstrição).',
        softWrap: true,
      ),
    );

    Widget pergunta5 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'Como ocorre a falta de ar?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo5 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'A falta de ar é a dificuldade de respirar. Algumas pessoas sentem como uma sensação de peso no peito, esforço para respirar e até mesmo quando não consegue respirar fundo. Acontece porque os brônquios (ou vias aéreas) se fecham e dificultam a passagem de ar. Muitas vezes vem junto com o chiado. Costuma aliviar quando usa a “bombinha” (broncodilatador).',
        softWrap: true,
      ),
    );

    Widget pergunta6 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'A asma pode causar problemas de sono?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo6 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'Os sintomas da asma podem mudar a qualidade do seu sono. Uma noite mal dormida pode afetar as atividades do seu dia-a-dia e piorar os sintomas de asma. Por isso, é importante seguir o tratamento, buscando controlar os sintomas e melhorar as noites de sono',
        softWrap: true,
      ),
    );

        Widget pergunta7 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'O que é a bombinha?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo7 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'A “bombinha” (ou broncodilatador) é usado para aliviar os sintomas da asma. Para o medicamento fazer efeito, é importante seguir as orientações dos profissionais de saúde e usá-lo corretamente. O efeito da “bombinha” (ou broncodilatador) é relaxar os músculos dos brônquios (vias aéreas) e facilitar a passagem de ar e aliviar os sintomas',
        softWrap: true,
      ),
    );

        Widget pergunta8 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
                'Para que serve o pico de fluxo?',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              )
      );

    Widget conteudo8 = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
        'Serve para medir a facilidade do ar passar nos brônquios (vias aéreas). É importante seguir as orientações dos profissionais da saúde e anotar o valor do pico de fluxo (ou peakflow) diariamente. Essas informações ajudarão o médico a escolher o melhor tratamento da sua asma. ',
        softWrap: true,
      ),
    );

    return Scaffold(
      appBar: AppBar(
        title: Text('FAQ'),
      ),
        body: ListView(
          children: [
            pergunta1,
            conteudo1,
            Divider(),
            pergunta2,
            conteudo2,
            Divider(),
            pergunta3,
            conteudo3,
            Divider(),
            pergunta4,
            conteudo4,
            Divider(),
            pergunta5,
            conteudo5,
            Divider(),
            pergunta6,
            conteudo6,
            Divider(),
            pergunta7,
            conteudo7,
            Divider(),
            pergunta8,
            conteudo8,
          ],
        ),
    );
  }
}