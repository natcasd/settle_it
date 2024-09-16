from flask import Flask, request, jsonify
import pandas as pd
app = Flask(__name__)

def process_string(data_str):
  losers = {"person": [], "balance": []}
  winners = {"person": [], "balance": []}
  lines = data_str.split('\n')
  for line in lines:
    if len(line[-11:].split('+'))>1:
      player = line.split('@')[0].strip()
      balance = line[-11:].split('+')[1]
      winners["person"].append(player)
      winners["balance"].append(int(balance))
    elif len(line[-11:].split('-'))>1:
      player = line.split()[0]
      balance = line[-11:].split('-')[1]
      losers["person"].append(player)
      losers["balance"].append(int(balance))
  losers = pd.DataFrame(losers)
  winners = pd.DataFrame(winners)
  losers = losers.sort_values(by="balance", ascending=False).reset_index(drop=True)
  winners = winners.sort_values(by="balance", ascending=False).reset_index(drop=True)
  return losers, winners

def calculate_ledger(losers, winners):
  count_los = 0
  count_win = 0
  los_balance = losers["balance"][count_los]
  win_balance = winners["balance"][count_win]
  end_ledger = []
  while count_los<len(losers) and count_win<len(winners):
    result = los_balance - win_balance
    if result < 0:
      end_ledger.append(losers["person"][count_los] + ", " + str(los_balance/100) + " -> " + winners["person"][count_win])
      win_balance = win_balance - los_balance
      count_los += 1
      if(count_los<len(losers)):
        los_balance = losers["balance"][count_los]
    elif result > 0:
      end_ledger.append(losers["person"][count_los] + ", " + str(win_balance/100) + " -> " + winners["person"][count_win])
      los_balance = los_balance - win_balance
      count_win += 1
      if(count_win<len(winners)):
        win_balance = winners["balance"][count_win]
    else:
      end_ledger.append(losers["person"][count_los] + ", " + str(win_balance/100) + " -> " + winners["person"][count_win])
      count_los += 1
      count_win += 1
      if(count_los<len(losers) and count_win<len(winners)):
        los_balance = losers["balance"][count_los]
        win_balance = winners["balance"][count_win]
  if count_los != len(losers) or count_win != len(winners):
    end_ledger.append("ledger doesn't check out")

  return end_ledger

@app.route("/api/calculate", methods=['POST'])
def submit_text():
  data = request.get_json()
  input_text = data.get('input_text', '')
  losers, winners = process_string(input_text)
  ledger = calculate_ledger(losers, winners)
  return jsonify({'ledger': ledger})

