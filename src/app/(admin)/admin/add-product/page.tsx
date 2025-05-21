"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Container from "@/components/ui/Container/Container";
import { toast } from "sonner";
import FileUpload from "@/FileUpload/FileUpload";
import { Heading } from "@/components/ui/Heading/Heading";
// Update this path if needed

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [salePrice, setSalePrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState<number | "">("");
  const [sku, setSku] = useState("");
  const [status, setStatus] = useState<"In Stock" | "Out Of Stock">("In Stock");
  const [unit, setUnit] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [clearImage, setClearImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [information, setInformation] = useState({
    weight: "",
    dimensions: "",
    color: [""],
    brand: "",
    form_factor: "",
    quantity: 1,
    container_type: "",
    shelf_life: "",
    ingredients: [""],
    other_features: "",
  });
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setSalePrice("");
    setCategory("");
    setStockQuantity("");
    setSku("");
    setStatus("In Stock");
    setUnit([]);
    setImage(null);
    setClearImage(true); // if FileUpload supports it

    setInformation({
      weight: "",
      dimensions: "",
      color: [""],
      brand: "",
      form_factor: "",
      quantity: 1,
      container_type: "",
      shelf_life: "",
      ingredients: [""],
      other_features: "",
    });
  };

  const handleInformationChange = (
    field: string,
    value: string | string[] | number
  ) => {
    setInformation((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return toast.error("Please upload an image");

    const token = localStorage.getItem("accessToken");
    if (!token) return toast.error("Authorization token not found");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("sale_price", String(salePrice));
    formData.append("category", category);
    formData.append("stock_quantity", String(stockQuantity));
    formData.append("sku", sku);
    formData.append("status", status);
    unit.forEach((u) => formData.append("unit[]", u));
    formData.append("image", image);

    // Append each information field
    formData.append("information[weight]", information.weight);
    formData.append("information[dimensions]", information.dimensions);
    formData.append("information[brand]", information.brand);
    formData.append("information[form_factor]", information.form_factor);
    formData.append("information[quantity]", String(information.quantity));
    formData.append("information[container_type]", information.container_type);
    formData.append("information[shelf_life]", information.shelf_life);
    formData.append("information[other_features]", information.other_features);

    information.color.forEach((c) =>
      formData.append("information[color[]]", c)
    );
    information.ingredients.forEach((ing) =>
      formData.append("information[ingredients[]]", ing)
    );

    try {
      setLoading(true);
      const res = await fetch(
        "https://blue-berry-server-v2.vercel.app/api/v2/product",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Product added successfully");
        resetForm();
        setLoading(false);
      } else {
        toast.error(data.message || "Failed to add product");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Heading className="text-primary text-lg md:text-2xl mt-5">
          Add New Product
        </Heading>

        <div>
          <Label htmlFor="name">Product Name*</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price*</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="salePrice">Sale Price*</Label>
            <Input
              type="number"
              id="salePrice"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category*</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="sku">SKU*</Label>
            <Input
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="stockQuantity">Stock Quantity*</Label>
          <Input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <Label>Status</Label>
          <RadioGroup
            value={status}
            onValueChange={(val) =>
              setStatus(val as "In Stock" | "Out Of Stock")
            }
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="In Stock" id="in-stock" />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Out Of Stock" id="out-stock" />
                <Label htmlFor="out-stock">Out Of Stock</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="unit">Units (comma separated)</Label>
          <Input
            id="unit"
            value={unit.join(", ")}
            onChange={(e) =>
              setUnit(e.target.value.split(",").map((s) => s.trim()))
            }
          />
        </div>

        <div>
          <Label htmlFor="image">Product Image*</Label>
          <FileUpload
            onFileSelect={(file) => setImage(file)}
            clearImage={clearImage}
          />
        </div>

        <h3 className="text-xl font-semibold">Product Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            placeholder="Weight"
            value={information.weight}
            onChange={(e) => handleInformationChange("weight", e.target.value)}
          />
          <Input
            placeholder="Dimensions"
            value={information.dimensions}
            onChange={(e) =>
              handleInformationChange("dimensions", e.target.value)
            }
          />
          <Input
            placeholder="Brand"
            value={information.brand}
            onChange={(e) => handleInformationChange("brand", e.target.value)}
          />
          <Input
            placeholder="Form Factor"
            value={information.form_factor}
            onChange={(e) =>
              handleInformationChange("form_factor", e.target.value)
            }
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={information.quantity}
            onChange={(e) =>
              handleInformationChange("quantity", Number(e.target.value))
            }
          />
          <Input
            placeholder="Container Type"
            value={information.container_type}
            onChange={(e) =>
              handleInformationChange("container_type", e.target.value)
            }
          />
          <Input
            placeholder="Shelf Life"
            value={information.shelf_life}
            onChange={(e) =>
              handleInformationChange("shelf_life", e.target.value)
            }
          />
          <Input
            placeholder="Colors (comma separated)"
            value={information.color.join(", ")}
            onChange={(e) =>
              handleInformationChange(
                "color",
                e.target.value.split(",").map((s) => s.trim())
              )
            }
          />
          <Input
            placeholder="Ingredients (comma separated)"
            value={information.ingredients.join(", ")}
            onChange={(e) =>
              handleInformationChange(
                "ingredients",
                e.target.value.split(",").map((s) => s.trim())
              )
            }
          />
        </div>

        <Textarea
          placeholder="Other Features"
          className="border border-accent"
          value={information.other_features}
          onChange={(e) =>
            handleInformationChange("other_features", e.target.value)
          }
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Submitting...
            </div>
          ) : (
            "Submit Product"
          )}
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
