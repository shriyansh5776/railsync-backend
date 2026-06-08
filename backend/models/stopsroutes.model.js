const routeStopSchema = new mongoose.Schema({
  trainId:{
    type:Schema.Types.ObjectId,
    ref:"Train"
  },
  stationCode:String,
  stationName:String,
  arrival:String,
  departure:String,
  day:Number
});


export default routeStopSchema