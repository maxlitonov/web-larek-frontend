import { Product } from "../../types/components/model/larekApi";

export class AppState implements AppState {
  products: Map<string, Product> = new Map<string, Product>();
  
}