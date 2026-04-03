import zipfile, os, glob

zip_path = "/content/dataset.zip"
out_dir = "/content/dataset"

# Unzip
with zipfile.ZipFile(zip_path, 'r') as z:
    z.extractall("/content")

# Quick check
for split in ["train", "val"]:
    for cls in ["bat", "kestrel", "other"]:
        p = f"{out_dir}/{split}/{cls}"
        print(split, cls, len(glob.glob(p+"/*")))

!pip -q install torch torchvision torchaudio scikit-learn

import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, models
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np

data_dir = "/content/dataset"
batch_size = 32
img_size = 224

train_tfms = transforms.Compose([
    transforms.Resize((img_size, img_size)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

val_tfms = transforms.Compose([
    transforms.Resize((img_size, img_size)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

train_ds = datasets.ImageFolder(f"{data_dir}/train", transform=train_tfms)
val_ds   = datasets.ImageFolder(f"{data_dir}/val", transform=val_tfms)

train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True, num_workers=2)
val_loader   = DataLoader(val_ds, batch_size=batch_size, shuffle=False, num_workers=2)

class_names = train_ds.classes
class_names

device = "cuda" if torch.cuda.is_available() else "cpu"

model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, len(class_names))
model = model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)

def run_epoch(loader, train=True):
    model.train(train)
    total_loss, correct, total = 0.0, 0, 0

    for x, y in loader:
        x, y = x.to(device), y.to(device)

        if train:
            optimizer.zero_grad()

        logits = model(x)
        loss = criterion(logits, y)

        if train:
            loss.backward()
            optimizer.step()

        total_loss += loss.item() * x.size(0)
        preds = logits.argmax(1)
        correct += (preds == y).sum().item()
        total += x.size(0)

    return total_loss / total, correct / total

epochs = 10
for epoch in range(1, epochs+1):
    tr_loss, tr_acc = run_epoch(train_loader, train=True)
    va_loss, va_acc = run_epoch(val_loader, train=False)
    print(f"Epoch {epoch:02d} | train loss {tr_loss:.4f} acc {tr_acc:.3f} | val loss {va_loss:.4f} acc {va_acc:.3f}")

model.eval()
all_y, all_p = [], []

with torch.no_grad():
    for x, y in val_loader:
        x = x.to(device)
        logits = model(x)
        preds = logits.argmax(1).cpu().numpy()
        all_p.extend(list(preds))
        all_y.extend(list(y.numpy()))

print("Confusion Matrix:\n", confusion_matrix(all_y, all_p))
print("\nReport:\n", classification_report(all_y, all_p, target_names=class_names))

save_path = "/content/bat_kestrel_other_resnet18.pth"
torch.save({
    "model_state": model.state_dict(),
    "class_names": class_names
}, save_path)

save_path

import torch
import torch.nn as nn
from torchvision import models

pth_path = "/content/bat_kestrel_other_resnet18.pth"

ckpt = torch.load(pth_path, map_location="cpu")

# Get class names (in the correct order)
class_names = ckpt["class_names"]
print("Class names:", class_names)

# Rebuild model skeleton (ResNet18 + correct number of classes)
model = models.resnet18(pretrained=False)
model.fc = nn.Linear(model.fc.in_features, len(class_names))

# Load weights
state = ckpt["model_state"]

# If it was trained with DataParallel, keys may start with "module."
state = {k.replace("module.", ""): v for k, v in state.items()}

model.load_state_dict(state)
model.eval()

print("✅ Loaded model successfully")

from PIL import Image
from torchvision import transforms
import torch.nn.functional as F

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
])

img = Image.open("/content/IMG_0314.jpeg").convert("RGB")
x = transform(img).unsqueeze(0)

with torch.no_grad():
    logits = model(x)
    probs = F.softmax(logits, dim=1)[0]

pred_idx = probs.argmax().item()
print("Prediction:", class_names[pred_idx])
print("Confidence:", float(probs[pred_idx]))

import os
import zipfile
from PIL import Image
from torchvision import transforms
import torch
import torch.nn.functional as F

# Paths
zip_path = "/content/Test.zip"
extract_path = "/content/test_images"

# Step 1: Unzip
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extract_path)

print("Unzipped to:", extract_path)

# Transform (same as yours)
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
])

results = []

# Step 2: Loop through ALL images (recursive)
for root, dirs, files in os.walk(extract_path):
    for filename in files:
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            img_path = os.path.join(root, filename)

            try:
                img = Image.open(img_path).convert("RGB")
                x = transform(img).unsqueeze(0)

                with torch.no_grad():
                    logits = model(x)
                    probs = F.softmax(logits, dim=1)[0]

                pred_idx = probs.argmax().item()

                result = {
                    "file": filename,
                    "prediction": class_names[pred_idx],
                    "confidence": float(probs[pred_idx])
                }

                results.append(result)

                print(f"{filename} → {result['prediction']} ({result['confidence']:.2f})")

            except Exception as e:
                print(f"Error processing {filename}: {e}")

from PIL import Image
from torchvision import transforms
import torch.nn.functional as F

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
])

img = Image.open("/content/IMG_0316.jpeg").convert("RGB")
x = transform(img).unsqueeze(0)

with torch.no_grad():
    logits = model(x)
    probs = F.softmax(logits, dim=1)[0]

pred_idx = probs.argmax().item()
print("Prediction:", class_names[pred_idx])
print("Confidence:", float(probs[pred_idx]))
