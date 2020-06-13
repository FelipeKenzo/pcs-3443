import 'package:flutter/material.dart';
import 'package:pcs3443/data_provider.dart';
import 'package:fcharts/fcharts.dart';

class ChartExample {
  ChartExample(
    this.name,
    this.widget,
    this.description,
  );

  final String name;
  final Widget widget;
  final String description;
}

class Record {
  const Record(this.date, this.goal, this.record);

  final String date;

  final int goal;
  final int record;
}

List<Record> dt;
// set x-axis here so that both lines can use it
final xAxis = new ChartAxis<String>();

final charts =  new ChartExample(
                  'Histórico',
                  new RecordLineChart(),
                  'Histórico',
                );

class FChartsApp extends StatefulWidget {
  @override
  _FChartState createState() => new _FChartState();
}

class _FChartState extends State<FChartsApp> {

  @override
  Widget build(BuildContext context) {
    final chart = charts;
    SharedPref sharedPref = SharedPref();

    Future fetchRecords() async {
      Data data = Data.fromJson(await sharedPref.read("Data"));
      dt = [
        Record(data.goal_array[2].date, int.parse(data.goal_array[2].steps), 1000),
        Record(data.goal_array[1].date, int.parse(data.goal_array[1].steps), 2000),
        Record(data.goal_array[0].date, int.parse(data.goal_array[0].steps), 2500),
        // Record(days[3], 10, 5),
      ];
      print('${data.goal_array[2].steps} ${data.goal_array[1].steps} ${data.goal_array[0].steps}');
      return dt;
    }

    return FutureBuilder(
      future: fetchRecords(),
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done || snapshot.data == null) {
          return Scaffold(
            body: Center(
              child: CircularProgressIndicator()
            ),
          );
        } else {
          return new MaterialApp(
            home: new Scaffold(
              // appBar: new AppBar(
              //   title: new Text('Example: ${chart.name}'),
              // ),
              body: new Container(
                decoration: new BoxDecoration(
                  color: Colors.white,
                ),
                child: new Column(
                  children: [
                    new Padding(
                      padding: new EdgeInsets.all(30.0),
                      child: new Text(
                        chart.description,
                        textAlign: TextAlign.center,
                      ),
                    ),
                    new Padding(
                      padding: new EdgeInsets.all(20.0),
                      child: new Container(
                        child: chart.widget,
                      )
                    ),
                  ],
                ),
              ),
            ),
          );
        }
      }
    );
  }
}

class RecordLineChart extends StatefulWidget {
  RecordLineChart({Key key}) : super(key: key);

  @override
  _RecordLineChartState createState() => _RecordLineChartState();
}

class _RecordLineChartState extends State<RecordLineChart> {
  @override
  Widget build(BuildContext context) {
    // set x-axis here so that both lines can use it
    final xAxis = new ChartAxis<String>();
    return new AspectRatio(
      aspectRatio: 4 / 3,
      child: new LineChart(
        chartPadding: new EdgeInsets.fromLTRB(60.0, 20.0, 30.0, 30.0),
        lines: [
          // coolness line
          new Line<Record, String, int>(
            data: dt,
            xFn: (rec) => rec.date,
            yFn: (rec) => rec.goal,
            xAxis: xAxis,
            yAxis: new ChartAxis(
              // tickLabelFn: (goal) => goal.toString().split("\.")[1],
              span: new IntSpan(1000, 6000),
              tickGenerator: IntervalTickGenerator.byN(1000),
              tickLabelerStyle: new TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),
              paint: const PaintOptions.stroke(color: Colors.blue),
            ),
            marker: const MarkerOptions(
              paint: const PaintOptions.fill(color: Colors.blue),
            ),
            stroke: const PaintOptions.stroke(color: Colors.blue),
            legend: new LegendItem(
              paint: const PaintOptions.fill(color: Colors.blue),
              text: 'Histórico',
            ),
          ),

          // size line
          new Line<Record, String, int>(
            data: dt,
            xFn: (rec) => rec.date,
            yFn: (rec) => rec.record,
            xAxis: xAxis,
            yAxis: new ChartAxis(
              span: new IntSpan(1000, 6000),
              opposite: true,
              tickGenerator: IntervalTickGenerator.byN(1000),
              paint: const PaintOptions.stroke(color: Colors.green),
              tickLabelerStyle: new TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
            ),
            marker: const MarkerOptions(
              paint: const PaintOptions.fill(color: Colors.green),
              shape: MarkerShapes.square,
            ),
            stroke: const PaintOptions.stroke(color: Colors.green),
            legend: new LegendItem(
              paint: const PaintOptions.fill(color: Colors.green),
              text: 'Meta',
            ),
          ),
        ],
      ),
    );
  }
}
