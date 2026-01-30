# Requirements and Setup

- **Backend**: Use the Python requirements in `backend.txt`.
  - Create and activate a virtual environment (Windows example):

    ```powershell
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    pip install -r requirements\backend.txt
    ```

  - Or (cmd.exe):

    ```cmd
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements\backend.txt
    ```

- **Frontend**: The frontend is in the `NoCap/` folder. Preferred method:

  ```bash
  cd NoCap
  npm install
  npm run dev
  ```

  If you prefer installing packages manually, see `frontend.txt` for the explicit `npm install` commands.

-- End
