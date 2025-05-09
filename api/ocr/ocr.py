import sys
import json
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient

# Enter Azure endpoint and API Key
endpoint = "aaaaaa.azure.com/" 
key = "aaaaaaa"

def extract_fields_from_license(image_path):
    client = DocumentIntelligenceClient(endpoint=endpoint, credential=AzureKeyCredential(key))

    with open(image_path, "rb") as image_file:
        poller = client.begin_analyze_document(
            "prebuilt-idDocument",  # model_id
            image_file  # this is the 'body' positional argument
        )
        result = poller.result()

    extracted_data = {}

    for doc in result.documents:
        first_name = doc.fields.get("FirstName")
        last_name = doc.fields.get("LastName")
        license_number = doc.fields.get("DocumentNumber")
        address = doc.fields.get("Address")

        if first_name:
            extracted_data["first_name"] = first_name.value_string
        if last_name:
            extracted_data["last_name"] = last_name.value_string
        if license_number:
            extracted_data["driver_license"] = license_number.value_string
        if address and address.value_address:
            addr = address.value_address
            full_address = f"{addr.get('streetAddress', '')}, {addr.get('city', '')} {addr.get('state', '')}. {addr.get('postalCode', '')}"
            extracted_data["address"] = full_address

    return extracted_data

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Image path is required"}))
        sys.exit(1)

    image_path = sys.argv[1]
    try:
        data = extract_fields_from_license(image_path)
        print(json.dumps(data))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
