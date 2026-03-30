import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import FilePreview from "reactjs-file-preview";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

const App = () => {
  const [files, setFiles] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [filesMeta, setFilesMeta] = useState<any>();
  const [formData, setFormData] = useState<{
    company: string;
    sector: string;
    documentType: string;
    filesMeta: { filename: string; year: number }[];
    query?: string;
    response?: string;
  }>();
  //   {
  //   "company": "Dangote Cement",
  //   "sector": "Industrials",
  //   "filesMeta": [
  //     { "filename": "annual_2024.pdf", "year": 2024 },
  //     { "filename": "annual_2022.pdf", "year": 2022 },
  //     { "filename": "annual_2010.pdf", "year": 2010 }
  //   ]
  // }
  const sectorsWithTheirCompanies = {
    Banks: [
      "Access Bank Ghana",
      "Agricultural Development Bank",
      "CalBank Plc",
      "Ecobank Ghana Limited",
      "Ecobank Transnational Incorporated",
      "First Atlantic Bank",
      "GCB Bank Limited",
      "Republic Bank Ghana Limited",
      "Societe Generale Ghana Limited",
      "Standard Chartered Bank Ghana",
      "Standard Chartered Bank Ghana Limited",
      "Trust Bank (The Gambia)",
    ],
    "FMCG & Beverages": [
      "Cocoa Processing Company",
      "Fan Milk Plc",
      "Guinness Ghana Breweries Limited",
      "Samba Foods Limited",
      "Unilever Ghana Limited",
    ],
    Energy: [
      "Ghana Oil Company Limited",
      "TotalEnergies Marketing Ghana",
      "Tullow Oil",
    ],
    Extractives: [
      "AngloGold Ashanti Limited",
      "Ashanti Gold Corporation",
      "Atlantic Lithium",
    ],
    Technology: [
      "Camelot Ghana Limited",
      "Clydestone Ghana Limited",
      "Scancom PLC (MTN Ghana)",
    ],
    "Financial Services": ["Mega African Capital Limited", "NewGold ETF"],
    "Healthcare & Pharmaceuticals": [
      "Dannex Ayrton Starwin Plc",
      "Intravenous Infusions Limited",
    ],
    Insurance: ["Enterprise Group Limited", "SIC Insurance Company Limited"],
    Advertising: ["Digicut Production & Advertising"],
    Agriculture: ["Benso Oil Palm Plantation Limited"],
    Education: ["Meridian-Marshall Holdings"],
    Industrial: ["Hords limited"],
  };
  const sectorOptions = [
    "Banks",
    "FMCG & Beverages",
    "Energy",
    "Extractives",
    "Technology",
    "Financial Services",
    "Healthcare & Pharmaceuticals",
    "Insurance",
    "Advertising",
    "Agriculture",
    "Education",
    "Industrial",
  ];
  const handleSubmit = async () => {
    if (!files) return console.log("No files selected");

    setLoading(true);

    try {
      const form = new FormData();

      // Append files (MUST use same key: 'file')
      Object.values(files).forEach((file: any) => {
        form.append("file", file);
      });

      // Append normal fields
      form.append("company", formData?.company || "");
      form.append("sector", formData?.sector || "");
      form.append("documentType", formData?.documentType || "");

      // IMPORTANT: stringify complex objects
      form.append("filesMeta", JSON.stringify(formData?.filesMeta || []));

      await fetch("http://localhost:3000/api/v1/documents/upload", {
        method: "POST",
        body: form, // 🚨 NOT JSON
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  async function AskQuestion() {
    const response = await axios.post(
      `http://localhost:3000/api/v1/analysis/analyze`,
      {
        query: formData?.query,
        companyId: "916010ae-f3a0-41bf-8f7e-17840fe8c74f",
      },
    );
    console.log("response", response.data);
    setFormData((prev: any) => ({ ...prev, response: response.data }));
  }

  console.log("formMeta", filesMeta);
  console.log("formData", formData);
  console.log("files", files);

  return (
    // <div className="grid grid-cols-1 gap-4 p-4">
    //   <h1 className="text-2xl font-bold mb-4">Cedi Portfolio</h1>
    //   <Select
    //     onValueChange={(e) => {
    //       setFormData((prev: any) => ({ ...prev, sector: e }));
    //     }}
    //   >
    //     <SelectTrigger className="w-full">
    //       <SelectValue placeholder="Select Sector" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="Banks">Banks</SelectItem>
    //       <SelectItem value="FMCG & Beverages">FMCG & Beverages</SelectItem>
    //       <SelectItem value="Energy">Energy</SelectItem>
    //       <SelectItem value="Extractives">Extractives</SelectItem>
    //       <SelectItem value="Technology">Technology</SelectItem>
    //       <SelectItem value="Financial Services">Financial Services</SelectItem>
    //       <SelectItem value="Healthcare & Pharmaceuticals">
    //         Healthcare & Pharmaceuticals
    //       </SelectItem>
    //       <SelectItem value="Insurance">Insurance</SelectItem>
    //       <SelectItem value="Advertising">Advertising</SelectItem>
    //       <SelectItem value="Agriculture">Agriculture</SelectItem>
    //       <SelectItem value="Education">Education</SelectItem>
    //       <SelectItem value="Industrial">Industrial</SelectItem>
    //     </SelectContent>
    //   </Select>
    //   <Select
    //     onValueChange={(e: any) =>
    //       setFormData((prev: any) => ({ ...prev, company: e }))
    //     }
    //   >
    //     <SelectTrigger className="w-full">
    //       <SelectValue placeholder="Select Company" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       {sectorsWithTheirCompanies[
    //         formData?.sector as keyof typeof sectorsWithTheirCompanies
    //       ]?.map((company) => (
    //         <SelectItem
    //           key={company}
    //           value={company}
    //           // onSelect={(e:any) =>
    //           //   setFormData((prev: any) => ({ ...prev,  company:e }))
    //           // }
    //         >
    //           {company}
    //         </SelectItem>
    //       )) || []}
    //     </SelectContent>
    //   </Select>

    //   <Input
    //     placeholder="Document Type"
    //     onChange={(e) =>
    //       setFormData((prev: any) => ({
    //         ...prev,
    //         documentType: e.target.value,
    //       }))
    //     }
    //   />
    //   <Input
    //     type="file"
    //     multiple
    //     onChange={(e) => {
    //       setFiles(e.target.files || null);
    //       const meta = Array.from(e.target.files || []).map((file) => {
    //         const match = file.name.match(/\d{4}/);
    //         return {
    //           filename: file.name,
    //           year: match ? parseInt(match[0]) : 0,
    //           document,
    //         };
    //       });
    //       setFilesMeta(meta);
    //       setFormData((prev: any) => ({ ...prev, filesMeta: meta }));
    //     }}
    //   />
    //   <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-2 justify-items-center items-center">
    //     {Object.values(files || {}).map((file: any, index: number) => (
    //       <div
    //         className="flex flex-col items-center"
    //         id={`file-preview-${index}`}
    //       >
    //         <div
    //           style={{
    //             width: "300px",
    //             height: "200px",
    //             borderRadius: "12px",
    //             overflow: "hidden",
    //           }}
    //         >
    //           <FilePreview
    //             preview={file ?? ""}
    //             placeHolderImage="https://placehold.co/600x400/fff/000?text=Placeholder"
    //             errorImage="https://placehold.co/600x400/fff/FF0000?text=Error"
    //           />
    //         </div>
    //         <p className="text-[8px] md:text-[12px] w-[200px] truncate text-center">
    //           {file.name}
    //         </p>
    //       </div>
    //     ))}
    //   </div>
    //   <Button onClick={handleSubmit} disabled={loading}>
    //     {loading ? "Uploading…" : "Upload"}
    //   </Button>
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    //   <Input
    //     placeholder="Ask a question about the documents"
    //     onChange={(e) =>
    //       setFormData((prev: any) => ({ ...prev, query: e.target.value }))
    //     }
    //   />
    //   <Button onClick={AskQuestion}>Ask Question</Button>

    //   {formData?.response && (
    //     <div className="p-4 border rounded mt-4">
    //       <h2 className="text-lg font-bold mb-2">Response:</h2>
    //       <p>{formData.response}</p>
    //     </div>
    //   )}
    // </div>
    <>
      <div className="min-h-screen bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Cedi Portfolio
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload company documents, preview files, and ask questions from
              them.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload form card */}
              <div className="rounded-2xl border bg-background p-4 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold">Document Upload</h2>
                  <p className="text-sm text-muted-foreground">
                    Select a sector, company, and upload one or more files.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sector</label>
                    <Select
                      onValueChange={(value) => {
                        setFormData((prev: any) => ({
                          ...prev,
                          sector: value,
                          company: "",
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectorOptions.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          company: value,
                        }))
                      }
                      disabled={!formData?.sector}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            formData?.sector
                              ? "Select company"
                              : "Choose sector first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {sectorsWithTheirCompanies[
                          formData?.sector as keyof typeof sectorsWithTheirCompanies
                        ]?.map((company) => (
                          <SelectItem key={company} value={company}>
                            {company}
                          </SelectItem>
                        )) || []}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <Input
                      placeholder="e.g. Annual Report, Financial Statement"
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          documentType: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Upload Files</label>
                    <Input
                      type="file"
                      multiple
                      className="cursor-pointer"
                      onChange={(e) => {
                        const selectedFiles = e.target.files || null;
                        setFiles(selectedFiles);

                        const meta = Array.from(selectedFiles || []).map(
                          (file) => {
                            const match = file.name.match(/\d{4}/);
                            return {
                              filename: file.name,
                              year: match ? parseInt(match[0]) : 0,
                              document: file,
                            };
                          },
                        );

                        setFilesMeta(meta);
                        setFormData((prev: any) => ({
                          ...prev,
                          filesMeta: meta,
                        }));
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      You can upload multiple files at once.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    {files?.length
                      ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                      : "No files selected yet"}
                  </p>

                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !files?.length}
                    className="w-full sm:w-auto"
                  >
                    {loading ? "Uploading…" : "Upload Documents"}
                  </Button>
                </div>
              </div>

              {/* File previews */}
              {!!files?.length && (
                <div className="rounded-2xl border bg-background p-4 shadow-sm sm:p-6">
                  <div className="mb-5">
                    <h2 className="text-lg font-semibold">File Preview</h2>
                    <p className="text-sm text-muted-foreground">
                      Preview uploaded files before submission.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from(files || []).map((file: any, index: number) => (
                      <div
                        key={`${file.name}-${index}`}
                        id={`file-preview-${index}`}
                        className="overflow-hidden rounded-xl border bg-muted/20"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden bg-background">
                          <FilePreview
                            preview={file ?? ""}
                            placeHolderImage="https://placehold.co/600x400/fff/000?text=Placeholder"
                            errorImage="https://placehold.co/600x400/fff/FF0000?text=Error"
                          />
                        </div>

                        <div className="p-3">
                          <p className="truncate text-sm font-medium">
                            {file.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right section */}
            <div className="space-y-6">
              {/* Ask question card */}
              <div className="rounded-2xl border bg-background p-4 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold">Ask Questions</h2>
                  <p className="text-sm text-muted-foreground">
                    Ask something about the uploaded documents.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Ask a question about the documents"
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        query: e.target.value,
                      }))
                    }
                  />

                  <Button onClick={AskQuestion} className="w-full">
                    Ask Question
                  </Button>
                </div>
              </div>

              {/* Response card */}
              {formData?.response && (
                <div className="rounded-2xl border bg-background p-4 shadow-sm sm:p-6">
                  <h2 className="mb-3 text-lg font-semibold">Response</h2>
                  <div className="rounded-xl bg-muted/30 p-4">
                    <p className="text-sm leading-6 text-foreground">
                      {formData.response}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
