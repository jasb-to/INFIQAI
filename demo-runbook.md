# INFIQAI Labeling Platform - Demo Runbook

## Overview
This runbook demonstrates the complete end-to-end workflow of the INFIQAI automated data labeling platform, from data upload through model inference, human review, and final export.

## Prerequisites
- Node.js 18+ installed
- Docker and Docker Compose
- Hugging Face API key
- Sample dataset (provided)

## Setup Instructions

### 1. Environment Setup
\`\`\`bash
# Clone the repository
git clone https://github.com/infiqai/labeling-platform
cd labeling-platform

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your Hugging Face API key
\`\`\`

### 2. Start the Platform
\`\`\`bash
# Start the development server
npm run dev

# In another terminal, start supporting services
docker-compose up -d
\`\`\`

### 3. Access the Platform
- Main UI: http://localhost:3000/labeling
- API Documentation: http://localhost:3000/api-docs
- Label Studio: http://localhost:8080

## Demo Workflow

### Step 1: Dataset Creation
1. Navigate to the Labeling Platform UI
2. Click "Create New Dataset"
3. Fill in the form:
   - **Name**: "Legal Contracts Demo"
   - **Description**: "Contract clause classification demo"
   - **Task Type**: "Multi-label"
   - **Customer ID**: "demo_customer"

### Step 2: Data Upload
\`\`\`bash
# Upload sample dataset via API
curl -X POST http://localhost:3000/api/datasets/dataset_1/upload \
  -H "Authorization: Bearer demo_token" \
  -F "file=@sample_contracts.csv"
\`\`\`

### Step 3: Model Configuration
1. Go to the "Configuration" tab
2. Set confidence thresholds:
   - **Auto-Accept**: 0.95
   - **Quick Review**: 0.60
   - **Full Human**: 0.0
3. Select model: "distilbert-base-uncased-finetuned-sst-2-english"
4. Set privacy mode: "Private Inference"

### Step 4: Start Processing
\`\`\`bash
# Trigger inference via API
curl -X POST http://localhost:3000/api/datasets/dataset_1/inference \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo_token" \
  -d '{
    "items": [
      {
        "id": "contract_1",
        "content": "This agreement shall terminate upon 30 days written notice by either party."
      },
      {
        "id": "contract_2", 
        "content": "The contractor agrees to maintain confidentiality of all proprietary information."
      }
    ],
    "modelConfig": {
      "id": "model_1",
      "huggingFaceModel": "distilbert-base-uncased",
      "taskType": "classification",
      "version": "1.0"
    },
    "userId": "demo_user"
  }'
\`\`\`

### Step 5: Human Review Process
1. Navigate to the "Human Review" tab
2. Review items flagged for human validation
3. For each item:
   - Review model predictions
   - Approve, edit, or reject labels
   - Add notes if necessary
   - Submit review

### Step 6: Monitor Progress
- Check the "Analytics" tab for real-time metrics
- View auto-accept rates and human correction rates
- Monitor model performance indicators

### Step 7: Export Results
\`\`\`bash
# Export as JSONL
curl -X POST http://localhost:3000/api/datasets/dataset_1/export \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo_token" \
  -d '{
    "format": "jsonl",
    "userId": "demo_user"
  }' \
  --output labeled_dataset.jsonl

# Export as Hugging Face dataset
curl -X POST http://localhost:3000/api/datasets/dataset_1/export \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo_token" \
  -d '{
    "format": "huggingface",
    "userId": "demo_user"
  }' \
  --output dataset.json
\`\`\`

## Sample Data Files

### sample_contracts.csv
\`\`\`csv
id,content,category
contract_1,"This agreement shall terminate upon 30 days written notice by either party.",termination
contract_2,"The contractor agrees to maintain confidentiality of all proprietary information.",confidentiality
contract_3,"Payment shall be made within 30 days of invoice receipt.",payment
contract_4,"Either party may terminate this agreement for material breach.",termination
contract_5,"All intellectual property created shall belong to the client.",ip_rights
\`\`\`

### Expected Output (labeled_dataset.jsonl)
```jsonl
{"id": "contract_1", "content": "This agreement shall terminate upon 30 days written notice by either party.", "labels": ["termination"], "confidence": 0.96, "human_reviewed": false}
{"id": "contract_2", "content": "The contractor agrees to maintain confidentiality of all proprietary information.", "labels": ["confidentiality"], "confidence": 0.89, "human_reviewed": true}
{"id": "contract_3", "content": "Payment shall be made within 30 days of invoice receipt.", "labels": ["payment"], "confidence": 0.94, "human_reviewed": false}
