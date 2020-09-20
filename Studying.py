import openpyxl

if message.content.startswith("시코야 학습") and not message.content.startswith("시코야 학습취소"):
    file = openpyxl.load.workbook("학습.xlsx")
    sheet = file.active
    learn = message.content.split(" ")
    for i in range(1, 51)
        if sheet["A" + str(i)].value == "-" or sheet["A" + str(i)].value == learn[1]:
            sheet["A" + str(i)].value = learn[1]
            sheet["B" + str(i)].value = learn[2]
            sheet["C" + str(i)].value = learn[<"<${message.author.id}>"]
            await client.send_message(message.channel, "학습하였습니다.")
            break
    file.save("학습.xlsx")

if message.content.startswith("시코야 어때"):
    file = openpyxl.load.workbook("학습.xlsx")
    sheet = file.active
    memory = message.content.split(" ")
    for i in range(1, 51):
        if sheet["A" + str(i)].value == memory[1]:
            await client.send_message(message.channel, sheet["B" + str(i)].value)
            await client.send_message(message.channel, sheet["C" + str(i)].value + "님께서 가르쳐 주셨습니다.")
            break

if message.content.startswith("시코야 학습취소"):
    file = openpyxl.load.workbook("학습.xlsx")
    sheet = file.active
    memory = message.content.split(" ")
    for i in range(1, 51):
      if sheet["A" + str(i)].value == str(memory[1]):
          await client.send_message(message.channel, "<@${message.author.id}>님, memory[1] 학습이 취소되었습니다.")
          sheet["A" + str(i)].value = '-'
          sheet["B" + str(i)].value = '-'
          sheet["C" + str(i)].value = '-'
