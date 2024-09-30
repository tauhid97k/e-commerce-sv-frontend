"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FieldPath } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormFieldset,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { TipTapEditor } from "@/components/tiptap-editor";
import { FileUploader } from "@/components/file-uploader";
import { productValidator } from "@/validators/productValidator";
import { AsyncSelectCombobox } from "@/components/async-combobox";
import { Switch } from "@/components/switch";
import { Textarea } from "@/components/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "@/lib/axios";
import { useState } from "react";
import { getQueryClient } from "@/lib/query-client";
import { handleError, handleSuccess } from "@/lib/handleResponse";
import { toast } from "sonner";
import slugify from "slugify";

const AddProductForm = () => {
  const axios = useAxios();
  const queryClient = getQueryClient();
  const [selectedAttributeId, setSelectedAttributeId] = useState("");

  const form = useForm<z.infer<typeof productValidator>>({
    resolver: zodResolver(productValidator),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      brand: null,
      categories: [],
      images: [],
      variants: [
        {
          attributes: [],
          sku: {
            sku: "",
            barcode: "",
            quantity: 0,
            stock_visibility: false,
            stock_alert: 0,
            old_price: 0,
            price: 0,
            cost: 0,
          },
          images: [],
        },
      ],
      is_featured: false,
      is_new: false,
      is_visible: false,
      published_at: undefined,
      seo_title: "",
      seo_description: "",
    },
  });

  // Get Categories (For Select Option)
  const { data: categoryOptions, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["categoryOptions"],
    queryFn: () =>
      axios.get("/options/categories").then((response) => response.data),
  });

  // Get Brands (For Select Option)
  const { data: brandOptions, isLoading: isBrandLoading } = useQuery({
    queryKey: ["brandOptions"],
    queryFn: () =>
      axios.get("/options/brands").then((response) => response.data),
  });

  // Get Attributes (For Select Option)
  const { data: attributeOptions, isLoading: isAttributeLoading } = useQuery({
    queryKey: ["attributeOptions"],
    queryFn: () =>
      axios.get("/options/attributes").then((response) => response.data),
  });

  // Get Attribute Values (For Select Option)
  const { data: attributeValuesOptions, isLoading: isAttributeValuesLoading } =
    useQuery({
      queryKey: ["attributeValuesOptions", selectedAttributeId],
      queryFn: () =>
        axios
          .get(`/options/attributes/${selectedAttributeId}`)
          .then((response) => response.data),
      enabled: !!selectedAttributeId,
    });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Add Product
  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof productValidator>) =>
      axios.post("/admin/products", formData),
  });

  // Add Product Form Handler
  const onSubmit = (values: z.infer<typeof productValidator>) => {
    addProduct(values, {
      onError: (data) => {
        const { validationErrors, error } = handleError(data);
        if (validationErrors.length) {
          validationErrors.map(({ field, message }) => {
            form.setError(field as FieldPath<typeof values>, {
              message,
            });
          });
        } else if (error) {
          toast.error(error);
        }
      },
      onSuccess: (data) => {
        const { message } = handleSuccess(data);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(message);
      },
    });
  };

  // Slug generation from product name
  const handleSlug = (value: string) => {
    const generatedSlug = slugify(value, { lower: true, strict: true });
    form.setValue("slug", generatedSlug, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <FormFieldset
          disabled={isPending}
          className="grid grid-cols-1 lg:grid-cols-4 gap-5"
        >
          <div className="lg:col-span-2 space-y-4">
            {/* Product Details */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">General Information</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            handleSlug(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Product Slug</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Description</FormLabel>
                      <FormControl>
                        <TipTapEditor
                          content={field.value as string}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                {/* Product Attributes */}
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Product Attributes</h5>
                  </div>
                  <div className="card-body">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <FormLabel>Attribute</FormLabel>
                        <AsyncSelectCombobox
                          defaultOptions={attributeOptions}
                          isLoading={isAttributeLoading}
                          onChange={(selectedOption) => {
                            setSelectedAttributeId(
                              selectedOption?.value as string
                            );
                          }}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`variants.${index}.attributes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attribute Options</FormLabel>
                            <FormControl>
                              <AsyncSelectCombobox
                                defaultOptions={attributeValuesOptions}
                                isLoading={isAttributeValuesLoading}
                                onChange={(selectedOption) => {
                                  const newAttributes = [
                                    Number(selectedOption?.value),
                                  ];

                                  const updatedAttributes = [
                                    ...new Set([
                                      ...(field.value ?? []),
                                      ...newAttributes,
                                    ]),
                                  ];

                                  field.onChange(updatedAttributes);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variants.${index}.images`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Variant Images</FormLabel>
                            <FormControl>
                              <FileUploader
                                maxFiles={3}
                                onFilesChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Product Pricing */}
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Product Pricing</h5>
                  </div>
                  <div className="card-body">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Price</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.old_price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old Price</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.cost`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            Customer won&apos;t see this
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Inventory */}
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Inventory</h5>
                  </div>
                  <div className="card-body">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.sku`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU (Stock keeping unit)</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.barcode`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.stock_alert`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Alert</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            Set a minimum threshold to get notified when product
                            stock is low
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku.stock_visibility`}
                      render={({ field }) => (
                        <FormItem className="flex gap-2 items-center mt-2 relative">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal !m-0">
                            Stock visible to customers
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-4">
            {/* Product Images */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Product Images</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          maxFiles={6}
                          onFilesChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Brand */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Product Brand</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AsyncSelectCombobox
                          defaultOptions={brandOptions}
                          isLoading={isBrandLoading}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Category */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Product Categories</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AsyncSelectCombobox
                          isMulti
                          defaultOptions={categoryOptions}
                          isLoading={isCategoryLoading}
                          placeholder="Select categories"
                          value={categoryOptions?.filter((option: any) =>
                            field.value?.includes(option.value)
                          )}
                          onChange={(selectedOptions) => {
                            const selectedValues = selectedOptions.map(
                              (option) => option.value
                            );
                            field.onChange(selectedValues);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Status */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Product Status</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="is_visible"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center relative">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-dark-200 font-normal !m-0">
                          Visible
                        </FormLabel>
                      </div>
                      <FormDescription>
                        This product will be hidden from all sales channels.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="published_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequired>Availability</FormLabel>
                      <FormControl>
                        <Input type="date" className="block" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product SEO */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">SEO (Search Engine Optimization)</h5>
              </div>
              <div className="card-body">
                <FormField
                  control={form.control}
                  name="seo_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Title</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seo_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </FormFieldset>
        <div className="flex justify-end mt-5">
          <Button type="submit" value="publish" isLoading={isPending}>
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
