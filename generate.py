from openpyxl import Workbook

def generate_attendance_file(filename="attendance_template.xlsx"):
    # Create a workbook and worksheet
    wb = Workbook()
    ws = wb.active

    # Updated headers
    headers = ["Name", "RollNumber", "Email", "TotalAttendance", "Feedback"]
    ws.append(headers)

    # Sample data
    data = [
        ["John Doe", "101", "john@example.com", 15, "Great progress"],
        ["Jane Smith", "102", "jane@example.com", 14, "Needs improvement"],
        ["Bob Lee", "103", "bob@example.com", 16, "Excellent attendance"],
        ["Alice Brown", "104", "alice@example.com", 13, "Average"],
    ]

    # Append sample rows
    for row in data:
        ws.append(row)

    # Save the file
    wb.save(filename)
    print(f"✅ File '{filename}' generated successfully.")

if __name__ == "__main__":
    generate_attendance_file()
