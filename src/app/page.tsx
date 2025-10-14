import { object, itemName, price, array, first, second, third } from "@/utils/desturing";
import { arrowFunction, sum } from "@/utils/page";

export default function Home() {
  return (
    <div className="container mx-auto my-20 grid gap-10">
      <div>
        <h2 className="text-lg font-bold">Arrow Function</h2>
        <p className="italic">{arrowFunction}</p>
        <p>a = 98000</p>
        <p>b = 98000</p>
        <p>console.log = Rp{sum(98000, 98000)}</p>
      </div>

      <div>
        <h2 className="text-lg font-bold">Desturing Object</h2>
        <p className="italic">{object}</p>
        <p>itemName = {itemName}</p>
        <p>price = Rp{price}</p>
        <p>console.log itemName = {itemName}</p>
        <p>console.log price = Rp{price}</p>
      </div>

      <div>
        <h2 className="text-lg font-bold">Desturing Array</h2>
        <p className="italic">{array}</p>
        <p>console.log first = {first.name} - Rp{first.price}</p>
        <p>console.log second = {second.name} - Rp{second.price}</p>
        <p>console.log third = {third.name} - Rp{third.price}</p>
      </div>
    </div>
  );
}