import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:sleek_circular_slider/sleek_circular_slider.dart';
import 'data_provider.dart';

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll('#', '');
    if (hexColor.length == 6) {
      hexColor = 'FF' + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}

final customWidth03 =
    CustomSliderWidths(trackWidth: 1, progressBarWidth: 20, shadowWidth: 50);

final customColors03 = CustomSliderColors(
  trackColor: HexColor('#90E3D0'),
  progressBarColors: [HexColor('#FFC84B'), HexColor('#00BFD5')],
  shadowColor: HexColor('#5FC7B0'),
  shadowMaxOpacity: 0.05
);

var info03 = InfoProperties(
  bottomLabelStyle: TextStyle(
    color: HexColor('#002D43'), fontSize: 20, fontWeight: FontWeight.w700
  ),
  mainLabelStyle: TextStyle(
    color: Color.fromRGBO(97, 169, 210, 1),
    fontSize: 30.0,
    fontWeight: FontWeight.w200
  ),
  modifier: (double value) {
    final steps = value.toInt();
    return '$steps passos';
  }
);

final CircularSliderAppearance appearance03 = CircularSliderAppearance(
  customWidths: customWidth03,
  customColors: customColors03,
  infoProperties: info03,
  size: 250.0,
  startAngle: 180,
  angleRange: 180
);

final viewModel03 = ExampleViewModel(
  appearance: appearance03,
  min: 0,
  max: 2300,
  value: 150,
  pageColors: [HexColor('#D9FFF7'), HexColor('#FFFFFF')]
);

class ExampleViewModel {
  final List<Color> pageColors;
  final CircularSliderAppearance appearance;
  final double min;
  final double max;
  final double value;
  final InnerWidget innerWidget;

  ExampleViewModel(
    {
      @required this.pageColors,
      @required this.appearance,
      this.min = 0,
      this.max = 100,
      this.value = 50,
      this.innerWidget
    }
  );
}

class Exercises extends StatefulWidget {
  @override
  _ExercisesState createState() => _ExercisesState();
}

class _ExercisesState extends State<Exercises> {
  SharedPref sharedPref = SharedPref();

  Future<Data> fetchGoal() async {
    Data dt = Data.fromJson(await sharedPref.read("Data"));
    print(dt.goal_array[2].steps);
    info03.bottomLabelText = 'Meta: ${dt.goal_array[2].steps} passos';
    return dt;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
        future: fetchGoal(),
        builder: (context, snapshot) {
          // if (snapshot.connectionState != ConnectionState.done || snapshot.data == null) {
          // } else {
          if (snapshot.connectionState == ConnectionState.done && snapshot.data != null) {
            final ExampleViewModel viewModel = viewModel03;
            return Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                    colors: viewModel.pageColors,
                    begin: Alignment.bottomLeft,
                    end: Alignment.topRight,
                    tileMode: TileMode.clamp
                )
              ),
              child: SafeArea(
                child: Center(
                  child: SleekCircularSlider(
                    // onChangeStart: (double value) {},
                    // onChangeEnd: (double value) {},
                    innerWidget: viewModel.innerWidget,
                    appearance: viewModel.appearance,
                    min: viewModel.min,
                    max: 1000.0, //Todo: necessario pegar a meta do banco de dados
                    initialValue: int.parse(snapshot.data.goal_array[2].steps).toDouble(),
                  )
                ),
              ),
            );
          }

          return Scaffold(
            body: Center(
              child: CircularProgressIndicator()
            ),
          );
          // }
        }
      )
    );
  }
}

