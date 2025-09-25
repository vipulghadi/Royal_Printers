"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ShadCN Select

export default function ProductVariation({ product }) {
  const grouped = useMemo(() => {
    return product.variations.reduce((acc, v) => {
      if (!acc[v.type]) acc[v.type] = [];
      acc[v.type].push(v);
      return acc;
    }, {});
  }, [product]);

  const [selection, setSelection] = useState({});
  const [qty, setQty] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  const updateSelection = (type, value) => {
    setSelection({ ...selection, [type]: value });
  };

  const addToOrder = () => {
    if (Object.keys(selection).length < Object.keys(grouped).length || qty < 1)
      return;

    let comboPrice = 0;
    Object.entries(selection).forEach(([type, val]) => {
      const v = product.variations.find((x) => x.type === type && x.value === val);
      if (v) comboPrice += v.price;
    });

    setOrderItems([
      ...orderItems,
      { ...selection, qty, price: comboPrice },
    ]);
    setSelection({});
    setQty(1);
  };

  const updateOrderItem = (index, key, value) => {
    const updated = [...orderItems];
    updated[index][key] = value;

    if (key !== "qty") {
      let comboPrice = 0;
      Object.entries(updated[index]).forEach(([k, v]) => {
        if (k !== "qty" && k !== "price") {
          const variant = product.variations.find(
            (x) => x.type === k && x.value === v
          );
          if (variant) comboPrice += variant.price;
        }
      });
      updated[index].price = comboPrice;
    }
    setOrderItems(updated);
  };

  const removeItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const whatsappMessage = () => {
    let msg = `Hello Royal Printers, I would like to place an order for *${product.name}*.\n\nOrder Details:\n`;
    orderItems.forEach((item, idx) => {
      msg += `\n${idx + 1}) `;
      Object.entries(item).forEach(([key, value]) => {
        if (key !== "qty" && key !== "price") msg += `${key}: ${value}, `;
      });
      msg += `Quantity: ${item.qty}, Price: ₹${item.price * item.qty}`;
    });
    msg += `\n\nTotal: ₹${totalPrice}`;
    return encodeURIComponent(msg);
  };

  const whatsappLink = `https://wa.me/${product.whatsappNumber}?text=${whatsappMessage()}`;

  return (
    <div className="w-full mt-8">
      <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
        Customize Your Order
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-2xl border shadow-sm">

        {/* Left: Variations */}
        <div className="flex-1 space-y-3">
          {Object.keys(grouped).map((type) => (
            <div key={type}>
              <h3 className="text-sm font-medium mb-1">{type}:</h3>
              <div className="flex flex-wrap gap-2">
                {grouped[type].map((opt) => (
                  <Button
                    key={opt.id}
                    size="sm"
                    variant={selection[type] === opt.value ? "default" : "outline"}
                    onClick={() => updateSelection(type, opt.value)}
                  >
                    {opt.value}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-medium mb-1">Quantity:</h3>
            <Input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 text-sm"
            />
          </div>

          <Button
            onClick={addToOrder}
            disabled={Object.keys(selection).length < Object.keys(grouped).length}
            className="flex items-center gap-2 text-sm bg-green-500"
          >
            <Plus className="w-4 h-4" /> Add to Order
          </Button>
        </div>

        {/* Right: Live Order Summary */}
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold mb-2">Order Summary</h3>
          {orderItems.length === 0 ? (
            <p className="text-gray-400 text-sm">No items added yet.</p>
          ) : (
            <div className="space-y-2">
              {orderItems.map((item, i) => (
                <div
                  key={i}
                  className="border rounded-md p-2 flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center text-sm"
                >
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(item)
                      .filter(([k]) => k !== "qty" && k !== "price")
                      .map(([k, v]) => (
                        <Select
                          key={k}
                          value={v}
                          onValueChange={(val) => updateOrderItem(i, k, val)}
                          className="w-20 text-xs"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={v} />
                          </SelectTrigger>
                          <SelectContent>
                            {grouped[k].map((opt) => (
                              <SelectItem key={opt.id} value={opt.value}>
                                {opt.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ))}
                    <Input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateOrderItem(i, "qty", Number(e.target.value))
                      }
                      className="w-16 text-xs"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="font-medium text-sm">₹{item.price * item.qty}</span>
                    <button
                      onClick={() => removeItem(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-1 flex justify-between font-semibold text-sm">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full flex items-center gap-2 text-sm mt-2 bg-green-500 hover:bg-green-400">
                  <MessageCircle className="w-4 h-4" /> Send Order to Royal Printers
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
