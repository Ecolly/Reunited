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
    Energy: ["Ghana Oil Company Limited", "TotalEnergies Marketing Ghana", "Tullow Oil"],
    Extractives: ["AngloGold Ashanti Limited", "Ashanti Gold Corporation", "Atlantic Lithium"],
    Technology: ["Camelot Ghana Limited", "Clydestone Ghana Limited", "Scancom PLC (MTN Ghana)"],
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
  console.log("files", files);
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Cedi Portfolio</h1>
      <Select
        onValueChange={(e) => {
          setFormData((prev: any) => ({ ...prev, sector: e }));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Banks">Banks</SelectItem>
          <SelectItem value="FMCG & Beverages">FMCG & Beverages</SelectItem>
          <SelectItem value="Energy">Energy</SelectItem>
          <SelectItem value="Extractives">Extractives</SelectItem>
          <SelectItem value="Technology">Technology</SelectItem>
          <SelectItem value="Financial Services">Financial Services</SelectItem>
          <SelectItem value="Healthcare & Pharmaceuticals">
            Healthcare & Pharmaceuticals
          </SelectItem>
          <SelectItem value="Insurance">Insurance</SelectItem>
          <SelectItem value="Advertising">Advertising</SelectItem>
          <SelectItem value="Agriculture">Agriculture</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
          <SelectItem value="Industrial">Industrial</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Company" />
        </SelectTrigger>
        <SelectContent>
          {sectorsWithTheirCompanies[
            formData?.sector as keyof typeof sectorsWithTheirCompanies
          ]?.map((company) => (
            <SelectItem
              key={company}
              value={company}
              onSelect={() =>
                setFormData((prev: any) => ({ ...prev, company }))
              }
            >
              {company}
            </SelectItem>
          )) || []}
        </SelectContent>
      </Select>

      <Input
        placeholder="Document Type"
        onChange={(e) =>
          setFormData((prev: any) => ({
            ...prev,
            documentType: e.target.value,
          }))
        }
      />
      <Input
        type="file"
        multiple
        onChange={(e) => {
          setFiles(e.target.files || null);
          const meta = Array.from(e.target.files || []).map((file) => {
            const match = file.name.match(/\d{4}/);
            return {
              filename: file.name,
              year: match ? parseInt(match[0]) : 0,
              document,
            };
          });
          setFilesMeta(meta);
          setFormData((prev: any) => ({ ...prev, filesMeta: meta }));
        }}
      />
      <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-2 justify-items-center items-center">
        {Object.values(files || {}).map((file: any, index: number) => (
          <div
            className="flex flex-col items-center"
            id={`file-preview-${index}`}
          >
            <div
              style={{
                width: "300px",
                height: "200px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <FilePreview
                preview={file ?? ""}
                placeHolderImage="https://placehold.co/600x400/fff/000?text=Placeholder"
                errorImage="https://placehold.co/600x400/fff/FF0000?text=Error"
              />
            </div>
            <p className="text-[8px] md:text-[12px] w-[200px] truncate text-center">
              {file.name}
            </p>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading…" : "Upload"}
      </Button>
      <br />
      <br />
      <br />
      <br />
      <Input
        placeholder="Ask a question about the documents"
        onChange={(e) =>
          setFormData((prev: any) => ({ ...prev, query: e.target.value }))
        }
      />
      <Button onClick={AskQuestion}>Ask Question</Button>

      {formData?.response && (
        <div className="p-4 border rounded mt-4">
          <h2 className="text-lg font-bold mb-2">Response:</h2>
          <p>{formData.response}</p>
        </div>
      )}
    </div>
  );
};
export default App;
