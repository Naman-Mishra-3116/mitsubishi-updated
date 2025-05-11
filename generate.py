from openpyxl import Workbook

def generate_attendance_file(filename="attendance_template.xlsx"):
    # Create a workbook and worksheet
    wb = Workbook()
    ws = wb.active

    # Updated headers
    headers = ["Name", "RollNumber","College", "Email", "Feedback"]
    ws.append(headers)

    # Sample data
    data = [
    ["John Doe", "101", "ABC College", "john@example.com", "Great progress"],
    ["Jane Smith", "102", "XYZ Institute", "jane@example.com", "Needs improvement"],
    ["Bob Lee", "103", "ABC College", "bob@example.com", "Excellent attendance"],
    ["Alice Brown", "104", "LMN University", "alice@example.com", "Average"],
    ["Charlie Ray", "105", "XYZ Institute", "charlie@example.com", "Can do better"],
    ["Diana Prince", "106", "ABC College", "diana@example.com",  "Outstanding"],
    ["Ethan Hunt", "107", "LMN University", "ethan@example.com",  "Irregular"],
    ["Fiona Glen", "108", "XYZ Institute", "fiona@example.com","Consistent"],
    ["George White", "109", "ABC College", "george@example.com",  "Good effort"],
    ["Hannah Moore", "110", "LMN University", "hannah@example.com",  "Well done"],
    ["Ian Scott", "111", "XYZ Institute", "ian@example.com",  "Punctual"],
    ["Julia Chen", "112", "ABC College", "julia@example.com",  "Could improve"],
    ["Kevin Brooks", "113", "LMN University", "kevin@example.com",  "Needs attention"],
    ["Laura King", "114", "XYZ Institute", "laura@example.com",  "Steady progress"],
    ["Michael Roy", "115", "ABC College", "michael@example.com", "Very active"],
    ]


    # Append sample rows
    for row in data:
        ws.append(row)

    # Save the file
    wb.save(filename)
    print(f"✅ File '{filename}' generated successfully.")

if __name__ == "__main__":
    generate_attendance_file()
