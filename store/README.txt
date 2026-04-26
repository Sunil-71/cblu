============================================================
  CBLU QUESTION PAPER PORTAL — store/ Folder
  Developed by: Mahak
============================================================

PURPOSE:
--------
This folder is the permanent storage location for all uploaded
old question papers (PDFs) for the CBLU portal.

HOW IT WORKS:
-------------
When an Admin uploads a PDF from the Admin Panel:
  1. The PDF is read by the browser and converted to base64 format.
  2. It is saved into the browser's localStorage under the key:
       cblu_files_v2
  3. Paper metadata (name, course, semester) is saved under:
       cblu_papers_v2

This means ALL uploaded papers persist permanently across
browser sessions — even after refresh or closing the tab.

STRUCTURE (logical layout inside localStorage):
------------------------------------------------
  store/
    ├── ba/
    │     ├── sem1/ → Hindi Literature, English Paper, etc.
    │     ├── sem2/ → ...
    │     └── sem3–6/
    ├── bca/
    │     ├── sem1/ → Computer Fundamentals, Programming in C, etc.
    │     └── sem2–6/
    ├── bsc/
    ├── mca/
    ├── bscm/
    ├── bscs/
    ├── bsch/
    ├── bam/
    ├── bag/
    ├── bahi/
    ├── baen/
    ├── ma/
    ├── bcom/
    ├── mcom/
    └── bba/

HOW ADMIN ADDS A PAPER:
-----------------------
  1. Go to homepage → click "Admin" link in footer
  2. Login with credentials (only one admin allowed)
  3. Select Course → Select Semester → Add Paper
  4. Enter paper name + upload PDF
  5. Paper is instantly saved to store/ and visible to students

HOW ADMIN DELETES A PAPER:
---------------------------
  1. Go to Admin Panel → Select Course → Select Semester
  2. Click "Delete" next to the paper
  3. Confirm deletion → paper removed from store/ permanently

HOW STUDENTS DOWNLOAD:
------------------------
  1. Browse any course → select semester → click Download
  2. A popup confirms → click "Yes, Download"
  3. If admin uploaded a real PDF → it downloads directly
  4. If no PDF was uploaded → a placeholder PDF is generated

NOTE FOR DEPLOYMENT:
--------------------
If you want to host this website online (on GitHub Pages,
Netlify, etc.), the papers will be stored in each visitor's
own browser localStorage. For a shared/server-based store,
you would need a backend (Node.js + Express + file system)
where PDFs are physically saved in this store/ folder on
the server.

For now, the localStorage approach works perfectly for
single-device / offline use.

============================================================
  © 2024 CBLU Question Paper Portal | Developed by Mahak
============================================================
