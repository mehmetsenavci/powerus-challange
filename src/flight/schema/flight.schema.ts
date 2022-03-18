import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FlightDocument = Flight & Document;

@Schema()
export class Slice {
  @Prop()
  origin_name: String;

  @Prop()
  destination_name: String;

  @Prop()
  departure_date_time_utc: String;

  @Prop()
  arrival_date_time_utc: String;

  @Prop()
  flight_number: String;

  @Prop()
  duration: Number;
}

export const SliceSchema = SchemaFactory.createForClass(Slice);

@Schema()
export class Flight {
  @Prop()
  id: String;

  @Prop({ type: [SliceSchema], default: [] })
  slices: Slice[];

  @Prop()
  price: Number;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
