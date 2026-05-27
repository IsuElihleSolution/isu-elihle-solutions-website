import { useState, useEffect, useRef, useCallback } from "react";

const ICON_B64 = "iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAIAAADCwUOzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFEWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA3LTA3PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmFmYWU5MjE4LTRjNjYtNGNmOS05MGMwLWMyYTJhY2M0NDEwOTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5JY29uZSBMb2dvIElzdSBFbGlobGUgU29sdXRpb25zICgxOTIwIHggMTA4MCBweCkgKDEwMDAgeCAxMDAwIHB4KSAtIDE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+U2l5YW5kYSBNYWt1cHVsYTwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhIGRvYz1EQUdzZnBuT09tTSB1c2VyPVVBQjQwYmR5T2tFIGJyYW5kPUJBQjQwVGxyb3RNIHRlbXBsYXRlPUJsdWUgUHVycGxlIE1vZGVybiBNb2xlY3VsZSBUZWNobm9sb2d5IExvZ288L3htcDpDcmVhdG9yVG9vbD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSdyJz8+bIgTUQAAIABJREFUeJzs3Xe8VOWh6P37OffeU25573k/77n3veW95RwLqIhSjYmxxhZLrLFr7LHGGGOMPbFijWvbUCygFEFUxIaCDRsqChZA6UjvsNnsPrzLGfew9rQ9ezMbeML3+1l/GFizZs3a8wk/Hp71rH+1AQAA2Or9qy19AgAAQNuEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDtA2GrXNyxftm7h/DWzZ66Y8e2yeXNXra9p2NInBUDlCXeAIC38bvV9t7x5YK/ogPS2X+/vt316R3v3jn7aO9qrTxTd8+70b5elUlv6RAGoEOEOEJg5M1b86oiBB/eMDu4VHZjeku2+d3rbK93uP+4THfuLJ6dOXbKlTxmAChDuAMFINacGVn1wWM/o5z2jQ9LbQb2+336WDvf90+2+b16779knuuD8kY2NzVv69AHYJMIdIAxNTc1/OHPEET2jw9Lboent4HS7H1iy3fdMbyefOLihoWlLfwgAOk64AwSgqbH5oqOf+kWP6Ih4S7T7Ifnt3ntju/803e4/aWn3444ZpN0BwiXcAQJw8yWjju4RHdUjarPd90+3+77Jdu+zsd3PP+/Z5mb3qwIESbgDbO3GPvfVsT2iY3pEpdq91w/tnpwwk1xkJjPZ/Ud9ottue3NLfyAAOkK4A2zVGuqbjt89Om73qES7l7hRdZ/EhJlsu69YUbOlPxYA7SbcAbZqrw6d9Mvdo2S7H5Vo98PT4V5ikZl98ibMxOF+/bVjtvTHAqDdhDvA1iuV2nDC7lG8Zdr92N1/GHQ/Oh3uR+a3e2LCzPcruyfafa/WE2Zqauq39IcDoH2EO8DWa8Xi6pPS4Z7f7kdl271lwszPi092z1/Z/f33Zm/pDwdA+wh3gK3X+BennrxblG3344u0e3bQPXuj6oHF2z0zYebyy17c0h8OgPYR7gBbrweueu2U3aIC7Z53o2pOu+ev7J6/wsyW/nAAtI9wB9ismhqaGuq+31JlLKd+8f4DTt0tKtjuxyRuVM1MmDk8b2X30ivMlHMCGfUNTXX1TfX1Ht4EsCUJd4DNZOmcVTcfNujSbtHF3aKLdv1+mzRuZumXnL5bdGp6y7T7iYnJ7scl2j1nsntyZfcSK8yU8ySmL79evM+hA7rtEWW2PQ/oP/HzBRW6HgC0j3AH2BymvTf3sm5RvF2a3jLtfuGu0aOXv1LiVWfsFsXtflp20D2n3Xu0avdiK7sXW2GmzXAfPHxyNtmT2/39P6rotQGgLMIdoNOlUht+1y26PB3u2Xa/pGXc/btpy4q98IYTh52RDvfkhJkTy5vsnrPCzAGJu1QzE2ZKh3tdfVPBas9sa9bWdcJ1AqAU4Q7Q6davqbtilyi/3TPj7sNve7vYCwdc+8YZ3aNsu5+caPfkU5nyV3b/ecHVIXu3avfS5zxl2tLuxcP9gwlzK32RAGiDcAfodKsWVf9+l6hYu99y9OBiL5w4bsaZ6XDPaff8ye7FBt2zK8zk3KV69ilDS5/zO+Nnlwj3YSO/qPRFAqANwh2g08XhfuUuUbF2v+Xop4u9cO3K9XG4Z9o9e6Pq9+1eaMJMcoWZNu9SfXnU16XP+Z3xs3bbI9pVuANsNYQ7QKerq67/wy5RsXYffd8HJV57yU8ficP9V4l2z18d8rhCq0Mm2/2gRLvvl54ws2J5TelznjFzRRzuxQbdP5u8sKJXCIC2CXeAzaHfgU8Ua/c1S9eVeOFn42aelR50/1XLCjOF273ICjM/TJjp1WrCzFW/GdXmCTc3p/bY+8HuhQbdu+9Z1dBgTXeAzU24A2wOqxdXX7VLlNPuv+0WfTJ6WukXxgF9dvforMSEmexk9+zqkNm7VLOT3Qs8kinxLNU2h9szpkxdUnDQ3XA7wBYh3AE2k7XLau467Klku095Z3Y5L/xkzPQfBt0TK8ycUnyFmewjmbJ3qR6aeJbq/Xe8U/45z5qzcv9DB2QH3fc5dMCUaUs7+PkB2DTCHSAA9//mpWLtnlxhps1B97jdG81yAQiTcAcIQM3aurPT4Z5dHTK5wswJiRVmknep5j5LtVe0Ylmp+fQAbM2EO0AAPhs745yWme7FVpgpvaz78fv0X7e5Hne6ctX66TOWf/LZ/LfHz/ps8sKZs1esWl1b+kGtALRJuANs7VLNqcv26n9u92jUQxOevvXt/BVmTkpMmEnepZqd6X7mYU/WrKvv7PNcumzdA498VOyZTfF25oUjp327rLNPA+CvlXAHKFtqw6rZqz7p/+lLv3nl6aOH3tM1evinjw0/8/lxt7wz58N5dWs7q4ynfjTvvF2jONwb6hrj/zl36tJL9n6k/EH3N0ZNSXXyaPfM2St+9euRJZI9uR198uAFi9Z26vkA/FUS7gBtSzWlPntsYlWXKEpvf0lvcbjH291do7u6Rnd2je7oGg047OkFkxZV+K1TG645+Mnzd42G3zk++4vNzalPx864ZL8B2aUhT94t91mqV50+/OvPFnR2ssend9+DH5SZ7Mntvoc+SJk7A9Aewh2gDYsmLnywS/RAl+j+9FaVaPd789q9X9eo/0EDV85ZVal3XzZv9QW7Rr/eNVpTaPH1psbm6tW1s6cs/XDMt8Mf+HDMsMlfTpi3YPbKmupOnxgTW7++4YxfP9uBas9sp5/3rAc5AZRPuAMUl9rwzrXjHt4xerhL9GB6e6C8du+3U/TxwM8rcgqjqz68cNfojlOGV+RoFVRX39ThZM9uJ5893Lg7QJmEO0BhqebUq2ePemTHqH8c7untobx2v694u9++U/Ty1W9s6jmkNly8a3TRrtFX4+dU5ENVSnxicXNverjHW797393SnwYgDMIdoJDUhpdOenbAjtGjO0aPpLecdn8g3e5V2XbvUrjd33tgwqacxcLpyy/u9n24N9RtXVNKBg75rCLVntm+/Hrxlv5AAAEQ7gAFfDlg4uM7Ro+ltwEt7d6/dLsXGXf/5o0ZHT6NETe/dWm36IFfj6rgR9t0K1etr2C1x9ueP+vf1NS8pT8WwNZOuAPkWjt39RM7RE/sGD2e3jLt/miy3dP5Xv64e1OHbsH8fvn2blEc7jMmLmjXC6tX144e+Nk5+w84bvforAMG3P7bl8a+8PXyxdUdOIeCfn3ZqMqGe7y98vq3lTo9gL9Wwh0g1+jDhwzcIXoybveWfM8MvSfbPd7KGXf/Pty7Rh89NrEDp7Fk9so43H/TrR3zZGrW1j1yw9jkmu6ZhzEdld4uPm7wrG829flHq1at37XS1R5vex/yqLtUAUoT7gCtLP9iydM7VA36fvu+3bP5nm33R4uPuyfXmbkrvd3R0u6N7Z+kPubBCb/tFt1x7JAy9//49ek/rOmeDvcTEg9jOqblYUxH9Ijuvu71Mhd3b2hoWr685quvFr/++rdPPPnJjTeNPfH0obvtEXXvhHCPt+/mr27vJQLYpgh3gFZe+cWwONzj7al0vg/Ma/cBxcfdc57NlJwwM+Od2e09k991i+Jwn/T69HJ2HjtscsEHqR6XGHSPw/3IHtHhPaObL3+p4EHqahtnTl/+/Igvrrny5Z/0ifbsE/2oT9S3b9Snb9S7b9Szb9Rjj6jzwn30q9Pae4kAtinCHWCj5oamITtUDUmHe7LdB5Y97v5Du3dt1e5xuA8+5dl2nUnNqtrf7RLF7b5u5fo2d14yd/WvdovicM8+SPWk9INUf5gtkx50Pzrd7nG4H9EzOqxnNHb01MxrU6kNc2etfPDud4/ct/++vaN9ekd794726h3F4f7jdLjv0Tc67fSht9w67ukhn7/86rTd0u3eGeF++R9f6cjPDGCbIdwBNqqes3pYOtzjbXCi3QcVavfkvaoFns3UMtn9zpZ2b9ctqtM/nHdFOtzL2fm6Ywb/qnt0Rku4ZwbdTyw+W+bwdLvPmbHi2ac+O6hXdGCv6IBe0f69ov3S4X7SUQOfeHTCxx/NW7hwTV1dY/KNatY37J4O986Y5r7nz/q376cFsI0R7gAbLX5v3jPbVw3bvlW7Z/K94Lh76Xa/N9Hud3SN1pcxdp416rZ3fr9LNPjKMW2f85xVZ3WPzozDPd3up2YH3RO3qB7X44dB9+xsmTjcD+0ZHdIzOrhXFLf7mcc+9eKzX86dvbKhvtTfLlavru3RaeEeb+VfH4BtkHAH2Gje6G+Gb1/1THob2tLuiaH3ku3eesLMfa1vVI3bfeXsVeWfyQ0/6h+H++QxbU9wH3bHu2enwz1n0D0O9+xsmeMKzZb5ec/oklOGjR87fV11fZlntWZtXadOcy//+gBsg4Q7wEbTn5w0YvuqEdl2T+d7Oe2evFH1/pbVIe9rvbL7/M8Wlnjr6mU1X7z8zat3jn/o5OFX7RLFWxzuHwz7ormtJxOd2z2Kw/2slnA/vdBsmeOLzJZZu6a2Xdenrq6xR99o93S4V3zQve9+D7XrZAC2NcIdYKM5z055Nh3uyXbPm/L+Q7vnPJvp+3bvktvuyUH3RV8uKfimjbWNz1z2yg07R9ftHF27c3T1ztEf0+H+h3S7X7FL9PmrpR5OFIf7OelwLz1b5thC4T5v1op2XZ/m5lQm3DtjtsxFvxvdrpMB2NYId4CNFr89Z+T2VSPz2j1n3D27RuTjiQUiH8mbMFPVeoWZ1fPX5L/jqu/W/Hmn6E87R3G4X59u92vidm8J9yvT4f67btETl71cbOj9vHS4Z2bLnJkzW6attWXmzFje3kt0yunDOmm2zLMvfNXuHxjAtkS4A2y0cvLi57avei6v3bO3q2buVd24vvuOrdo9Odk9/y7V+ryp5GsWrr15pygn3JOD7lemB90z60L2O2pwc6EHJ523a5SdLXNm8dkyBdeWWbOqHffLZgx7ZnI23Cs76L5w0doO/tgAtg3CHWCj+hXrn9+u6vlC7Z6ZMzM479lMj6fbfUDiRtXkCjPJu1Rz3qthfcMtO0WZcI+3G9Ptfl16uzox6P77lna/vFs07IZx+ed8+ynDy5ktc1yh2TKNjW1MoM+3aNHaTLhXdjX3/Q57rIM/M4BthnAHaGXUdlUvFGv3vMnu+RNmig26f/TAhJw3GvPnt25Lh3v+oPs1hQbd43C/rFu0cmHusPQ7w79MzpZJri1TbJr7Uelw/+O5Izt2iX5+5BMVn+Y+9q0ZHTsZgG2HcAdoZdpfJrTZ7tkJM4NaJszkrjDTcpdqdqb76rmrk+/SUNt4+05RHO63psP9pjjcWwbdry8+WyYO94fOfSHnhGvX1Sdny+SEe/5smaNbBt07MME9473351Q83JvaWjwHAOEO0Erj2voXt6sq1u7D8to9uTpksbtUhx49NOddZo2f26/rD+F+Szrc/5wI95xbVH/fcovqb9PtXlfTkHO0Ybe/02q2zG4/zJY5JTHofnzLbJlMuF9+8rBNuUq/OmdEBe9Pff+juZtyMgDbCOEOkGvmgM+S7Z6zzsywHTbeqFpwdcj8CTNLv16a8xZv/OmtTLjflg73H2a6p8M9Z13IP7SeLRO3+3dTco/WWN902V79N86WSd+felrrcM+ZLbO+ptyHLhVUXV1fqdXc/3B920+HBWCDcAfIl2pKjek94MV0uMdbZtA9s7778EKT3QcmJsxk7lJNhvtrv3kl/y2GnPJsHO79Ws+WSd6iWmy2TBzunxVa1n3V0nWlp7mfkAj3udNLTZJpamquq22sWVdfX99UcB2bjEWL1m76bJmTzx5e4i0ASBLuAAU0rK4bnR10z2v3YYmV3TMrzCSXhkw+S3XQPo/Hfw3IP/6Qk0fcEYd7kdkyJdaWicP97UGfFzzndatrr/3FU2eWXBTy7AMGrFhSXfDl1Wvr7rrxjZ/1ig7oFe3XO9q3d7R37+invaPTTxz8/vjZBfN6ztxVmzJb5swLn+vAsjYA2yzhDlDY+u/WjG492b3VoHtidcj8u1Qzs2UG7jkgf+32jJd+99qd6XC/vfVsmYILuufMlik44p6RSm2YMuG7S/d9tGC4vzZsclORUP7grZkH94wO6hX9EO7pds+E+169o5/0ifbsE303b3X+CxcuWtuxar//kY9ShtoB2kO4AxRVk2737ISZ51qvMNP6kUy5M92HH/JUY21jsSN/PnhyJtz7FVlbpsRsmQXTlpU+7TiIly9cO/WT+a89/fmgfu88fff4rz7+rrGhqdj+wwZ8ckjP6JBe34f7gelw3z894r5PJtz7RD9Oh/uP+kSTJi3If3ldfdN1N40tP9mPPXXIkqXryv8pAJAh3AFKaW5o+vj8l3NWmBmeeJxqwZnu4y59peAMmawVM1bE4d7e2TKZtWWKjZp3zMiBEw/rGR0ah3vPRLinR9z3SQ+6Z0fc43Dv2zdaUmSmzYJFa6+45tXSyf6rX4+cPnNFBU8eYJsi3AHaVj1r1XunPPd8kZnuTydmug/bc8CSzxa1fcTUhgf3GpAN99JPYrqqZbZMHO7P3fJ2BT/XvFkrD+8ZJcP9oHS450xz/0l60D0O9z36Rgf8rH+J20nr65sWLFzz4cfzxr49c+xbM94aP+vzyQtnzVm5dm2dm1ABNpFwByhX3fL181+d/u6pzxdcXiYO909uG7+h7Dr97pP5+dPcb0qH+43Jae7pEffsbJm6dZu0jGOO35w45Ih0uP88He4H90pMc28J970Ss2X2SA+6D3tmUgXPAYAyCXeA9kttqF9du+KLJWtmrmyoro//51f9P83MlmlcX3Ree77nLhh9RxzuXTdOc/9zyUUhvxw7o4IfYvmS6l/0iLLhfmgc7j0LhPtPW4d7n75R776R+0oBNj/hDlAJqQ0vHvz0oB2qXj3x2fIH3VNNqSePGtKva+HV3K9vHe6jbq3kJJnY2y9PO7Il3A9Lj7gfUmjE/ad5I+5xuC9YuKayJwNAm4Q7QGXUrawdlB50/6L/p+W/KtWcGnfru7e33J96c+twz96f+vHIryt+wg/eNO77Efce0eEFR9xbVoTMvz+1T99owsfzKn4+AJQm3AEqZtaoaZm1ZVa2tWJjjuql68b8+a2Cq7l/MGhSY33RlRw3xZ8uGpUN9xILy2RG3HPCfdSLlf+LBAClCXeASvrwmnGZRSEbijx6qbSmhqbatXWZraH4MvAVcctlo48qI9wLjrgPHzG5U88NgHzCHaCiUhvGnP78EztEI342sPRS7lvck/e+V86Ie8Fwf+vtmVv69AG2OcIdoJRUY3PT+sZ4K/+W0+bG5pEHDnp8x2jcxS+X/6rN79PxszMj7jkrQh6YnuaeE+57pcN9z3S4x9v8+as7/L6p1Iba2sZ4qy/+MFcA8gl3gMIaVtVOPP2FMf9S9ep2Va9sV/XydlUzH/s8Vd5ThBrXNzyefoTq279/fatt95rq+jjcswvLHJoI94LPYEqOuHdsOcj4VePenpl8luphxw+aM29VpT8ZwF8n4Q5QQN2i6rH/UvV6eovD/dV0uL+0XdWbBzxV5gSY2pXr43B/dMfonavHbrXtfstvRh/Z3hH3PtHrr3/bsbe74ZZxyWrPbu99OLeynwvgr5JwByjg48OHxuH+RjrcX0uE++jtquaOmFLmQarnrxmwY/RI3O7XjCvY7k0NTWsXVS+cvHjZ9BW1q2sr+QHKs2LpuvxwL7iU+0+yS7n3jdZ16Omt075dVrDaM1tzef+UAbAtE+4AeZpTb/5L1bhsuP/LD+H+cjrcx+0/qPwjLZ+y9NEdo/47RuOuGJNt91Rzat6H3404beQ9XaO7ukZ3do36dY1u3+n7xzC9fd+H65bXdMqHKuLDN2cWHHE/oPiI+0knDW5o//T0G24tPNye2Vav2QJ/bwEIi3AHyJVqaHorHe6Z2TLJae5xuL+4XVW7jrb866VxuD+8YzT6rBdSTam1C9dGXaK/dInu7Rrlh3tmKffR141r6py12wua9NG8NkfcMw9PfeiBDzIPTz362EF1de1brfJnRz5eItw9ihWgTcIdIFeqsTkb7m/khfvoHe5v7wFXfrsiDvcHu0SDDx5U1SWqSof7X9Lhfnc63O+Iw73rxnD/807RnT9+pL6moTM+XUHLFlefe9SgYuG+V+/o3DOeqV5bF+/58cfz4nDv3Tc6+OePtavdz7zguRLhvnTZuk77cAB/JYQ7QJ7UhhIj7p9d8UYHDrlm7uqHukQPdInu7xJFXaL7ukT3dmk14t5vp1bh/qedo78cNLB5864EP2/Wiifu/+CYfftnw/3kowY+M/jzRQvXJnebOnVJHO69+kZHHDOwsbG5zIOPenlqiXC3NCRAm4Q7QAELh3/9ZmLE/bVEuNct7cgc9ObG5gfT4V7miPufd45u2Dl6t/8nFf9o5YhzfH1NQ4kbRqdNWxqHe4++0dkXjCzzvtKGhqa++z1UsNqv+XNH/i4EsK0R7gCFpDZ8c+M7yRUhvw/37atWfraoY8f7ctCk0iPumTnutyZG3ONwv37nqKG2fVPJN5v33p8Th/vue0SXXflSmcu6L122rs++ue1+xvnPWlIGoBzCHaCoFePnffjzoZkR90mXjaldVN3BA6U2DNj1wQ6MuMfblLEzK/qZKmnEyC/icO++R3Tb3e+U+ZJ1NfX3PvB+Jtn3O+yxUS9PVe0AZRLuAJ2ubnXtwztG5Yy435I34j7w3Be29OmXUvXQB7ulK3zI8Mlb+lwA/soJd4BOt3zqssyqMuWPuP+pZcT9up2jLX36bfjtH17eNd3u73/kAagAnUi4A3S6xZ9jTeT8AAAgAElEQVQtyo64V6VH3Euv454cce+8cE81p6Z8tuD+P4+74ozhmXXcr77whTdemrqynU+Aam5OnXrOiMzslznzVnXS2QIg3AE63YpvlidH3JPhfvcWCvcJb848ukd0VI/oyB5R/pNTLz935KoV68s/Wn1D0/6HPxaH+08O7F/+ApEAtItwB+h0NctqioV7myPu9xz0ZGVPJpXa8NRf3jumR1Qs3LMPYPpubjuGz5csW5cZdL/qhjGVPWEAMoQ7QOdLbXg4Xe054X53OtzvSIf7belwvzkv3Mfd/1ElTyS14cEbxh63e3RMutqLjbjH4b5/+gFMi1s/eqm0N96akWn3jyfOr+A5A5Ah3AE2hw/6jc+OuN+XDvd70iPud7aMuGcWcb9lp+imdLjf2HJn6op5qyt4Gs8/9snxu0fH9YjyR9wPTYT7AS1PTt23d7RuXX35x7/y+tcy7T5m7PQHHv3otrvfuSt6b8jwyePenjl9xvKmJrNoADpOuANsglR6K0PtqtoH8sK94Ih7MtwHnTeqgie7ennNL3eP4nA/NjHifkTJEfd9ekcXn/Nsmcevq2+q6v9hwWejZrdfXzbqqylLKvihALYdwh2gHeqW1cwbOXXCxa+O3L7q2e2rhm9f9cz2VUO3r3r+x49PvO29xR/OTzUVDfn3bx9/f16435kI91vzwr12bTtGu9s04OY3T8iEe8uI+y/S4X54YsT9oJYR92y47907Wr2qjRtVU6kNI0d9XTrZk9vPjnz8i68WV/CjAWwLhDtAWdZMWfbecSNe2K7qhe2rntu+Kg73EelwHxaH+w5VQ3aoGrxD1VM7VA3aIZr61ORUwTkhqQ2vXzGm4NOX+u3UKtz/lA73L16aVsHzj9v6xN2jXybCPWfEPRvuP8sL91HPfVniyCtXrj/ihKfKr/bsdvMdb3tsKkD5hDtAGxrX1n98zujR21W9GFf7dlXPp8P92XS4P5MO9yHpcH86He4Dd4ie3CF6Ysdo0YRCN2imNnza/9NylpR5/4nPip3PmqXrXn/448u6RZd2i67d77GhN735wfNTlsxZlSrZwKuX15yQF+7ljLj/tHd05ilDix124ucLurc/2bPbEb98qq6+qR0/DIBtmHAHKGX9/LUvb1f10nZVyXDPmSeTGW5/+vvh9u/D/Yl0uD+2Y/T+n94uOAN+9bw1A/Z/Inln6u2t70ydO3FBwZNZvbj6sQtfvLxb9NtuUSbcL+kWXbRrdEF6u/ynjyyeU3QBxxlfLc7Mkzk+PcE9J9x/ng73gxMj7vulw33v9LZX78JryU+ZtnS3PaJdNyHc4+3okwdb+h2gHMIdoKh1s1bF1f5y62pPzpN5pmWezNM/zJOperKl2uPt0R2jF08ZmSo0GyT+xcVfLnnnrvef+MWQzAT3p08f+e4DExZ9vbTYLPl3nvjs97tEv9slujxd7T+E+67fh/uFu0a/3jU6f9fo3O7Rey9MKfjyGV8uzoy4Z9aCbHMR98ySMnunR9z36lMg3OvqGnffI9r0cI+30897tvQ/FwCwQbgDFFO3tOaVdLVnhttHpcP9uXS4j2iZJ/NMkXkyj+8YDUiHe/8do3euGbfpJ/Pire/8YZcoG+6/7Rb9Jh3uF+/6w4h7HO7nxVv36Jzu0etPfZ5/hCXz12RG3I9LjLhnwv3wIuG+X8lwv+CSFzLhvonVntneeW/2pl8lgL9uwh2ggOb6pjd6PJI7SWa7wsPtOfNkHk8Pt8fh/kg63B/eMZrz9uxNOZmZH8+/apfoykS4X1Yk3M9Nh/tZ3aPZX+cuubh+XX0y3Msfcd+rd3TReSNzjjZ12tIefaNKjbhnNqu8A5Qm3AEK+OraN5PD7Tmz25PryQzeOE8mypkn80i62h9KL9/esL6hY2eSak79cZfoD+lwvyIO98QE90vTE9xzwv3sdLj/qnvUlDdx/IrjBiefvvSLdLjn3Jl6UOunL2VG3Me98W3OoY45/qke6Wqv1Ih7vD334tcdu0QA2wjhDpCrdsHaVwtVe85w+7C84fZsuCeH2zMPTH3992M6djIzJ3x3VTrcf58X7pk7Uy9Mh/v5LfNk4nA/Mx3u7704NedQn749q71LymRG3OvqGpPHmTV7Rc++USbcN2VJmZxtv8Me6+APDGDbINwBcn117VvZe1JHp6s9s3Z7chXI5Oz2dLhHBefJPJQO98xzlzo26P7gic/kz5MpdmdqZp5MHO5ndI8u2W9AzqFSqQ1n7//osXnzZA5LV3uxtSCHD52Uc5wnnvy0RyeEe7wtWLimgz8zgG2AcAdopbmhKVnto/LWbi+4CuSgIsPtmXkymXD/emTh9V5KnUxTc3aeTCbcf1vGBPfvw3236PTdovwFbeZ8u6zVWpDJO1MLrQX5yyOfzH9G0oEHP9qz0hPcM9sLL7X7EgFsO4Q7QCvrZq7MrfaWe1Kza7fnzW6vyi4mk5zd/nCXH+bJVKW3gQcPau/J1FXXX7VLdFVinkz2ztRL0uGeM0/mnHS1Z8O94O2ebzz3VcE7Uw9JD7f/8NjUlgnu1Wvrcl7e2Njcq2+UHXGvbLjfcufbHfyxAWwDhDtAK9+NnJqc2v5CotoLLibzVN7s9kcLDbff1yX6S5eo2BrtxaxfU5ecJ1P+BPc43E/brcD9qRmffzA3/87Ug1vfmXrJOc/mV3ts3br6TLh3xoj7L058uiM/M4Btg3AHaOXrm8dnqn1Ueqy92D2pZc5uz4R71BLuNctr2nUyDXWNG+fJdGu9EGTimann5YT7bj+Ee/4sl6z6usbhj31yeGLE/aCWEffLzx/53dyiT2BdvrwmG+7dKx3u8dau6wOwTRHuAK18/rvXX2w9tX1k4olLw3LvSf1h7fbk7PbkKpCZeTJRutrv7RqtnF00iPPF2b1kxor89WSyE9wvLD7BPd5O3a3tCF69cn1mxP3mK195YdikLz5bUNvWHbRr1tR2xpIywh2gTcIdoJVPLnylWLVnJ8k8Xeie1BKz2/+S3u7pGi36YnGbJ1C9rOaLl7957Kzn/5ie3Z6cJ3NZ63kyxVZwzwy397/ujTbf69uvFv88He75t7EWU1/f1El3psbbyWcNL/M0ALZBwh2glcnXv1262nOfuFToUanJ2e3Z4fY43JdOW1bwTRvrmpZOX/HW/R9dv3N03c7RNTtHV+8S5YR7sXkyxSa4z5+5os0PO/TRj+Nwv+KcZ8u/PqnUhk6a4B5v91S9V/6ZAGxrhDtAK1Pvm1C42rfPqfYf7kl9vPU9qcVmt8fhfnfXaM38Nc2NzXVr61bNWz3v0wWfPDVpxMUv/Xmn6M87RzfuHN2QrvZ4uzod7q9Xfbjom2XNzanHLnyx2HoyBVdwj8O9369fKOfDnnrggEN7Rq8+/1W7LtHZ54+s7DNTs9u778/uyM8MYNsg3AFaWTRuVn61D0tUe85zUssfbo/D/c6u0R1do35do9t3im7dKbplp+jmuNp3iv6UrvY7fjrgtTvGz/hg3roV65OnVL++odh6MjnzZLILQda3ftZpQXW1jZl5MvOL34pa0Lvvze6kCe41HXpGFcA2QrgDtFK3rCZ/rD2zavvg9Fj7xvUfW0+Syb8n9YfZ7elqvydd7Xemq73fTtFt6XB/5oLRHzw2cdaH81Z9t6axrqnEWa1bub6s9WTS4b66vLVrvvhkfuaZqSUWnykozuvOCPfjThvartMA2NYId4DWUhvyZ8iUntqef09qcu32zHD7XV2j164Zu+zb5euW1TSsb2jvgu6x2ur6e08dUXC4PTtP5s+nDq+vbXusPeOOq1/LrCfT3jOJ3XDz2IpPcP/y67bv3AXYlgl3gFwzh36ZM689We3J9R9brSSzY6Fq7/LDJJk43GtaT4DpmCnvzb1qn0c3PnepZZ7Mn04c9vnbs1Jl/3Ug1ZzKzJOZ+OHcDpxGXV1jZcP98OOf6sBpAGxThDtAroa19TlryJSu9oJT23OG20ee/2IFz3DN8poZny385uP533wyf/rnC+tq2j01fNY3yzLPXVpfU9+xc3jl9W8qGO6z5qzs2GkAbDuEO0AB0574PDk9pu1qLzjcnrgndf2q2i39mVqJbhp3aM/onKM3aZz799e9VpFqf+CRjyr1uQD+igl3gAJSzakXD3wqu/Jju6o9fyWZr56fsqU/UCvNzanMA1Pff3PGph7n+EGbWO0X/PbF8mf4AGzLhDtAYY3rG4f3fTSz8mOxak+u2v5AotqzK8nc1TV6+crXt/RHyTV18qLMejJ1Zd/JWkxtbePPjxvY4Wr/021vqnaAMgl3gKLq19QN7dn/yeJj7Q8XrPYuG6v9pSvGbNj6wvSGS1/8ec/o+ksrM+2+uTl1533jO1DtQ0ZMrsgJAGwjhDtAKQ3r6p/Z67HHi8yQKbBqe6La37zt3c1Q7anUhuUL174xZHLVFa9cdezgk3eLTt49Onvv/g9e98YHr09fuyp3KZu1a2oz68lM+6qSyy/OnrPy5LOGl5ns1908trq6gzfFAmyzhDtAG5rqm967dlzpsfb8G1KnvfptZ5/Y+ur6sUMmZZ+Weupu0Slxte8WnbR7dMLu0S93j47fPTq2R3TV6cNnf7Ms+6ohj0yIw/34fR9JtfO5S+WYv2DNQwMm7H3IowV7/bDjBr085ps1a+sq/r4A2wLhDlCWVTNXvnT6czl3o+ZWe3q4/ZPHJjasb/f6jO0SN/fzVR8mn5Z6Wku4n7RbdGJLuB+XDveje0RH9Ygu+MWgNavWNzU1Z25LHT92eqeeYXNzqq6+qWZ9Q3V1/fr1DfX1Te19PisAOYQ7QDusW1w9ZfhXL5//Yk61P77fE+PvfO+7CfM78EjU9lq7cv1Vhz6ZqfbkcPupieH2E9LD7cf1iI5pCfcje0RH9IzuunZMZp5MXPCdfZ4AVJZwB9gEqQ2b+d7TFQvXnts9Oqd7dFbecPvJ6e3ElmqPt2PS4X5UejsiHe6H9YzicH9l5Jeb9aQBqAThDhCMZfPXnJeu9rNbwr3U7Pbdc4fbD0tvh/aMJn86f0t/FADaTbgDbAENtY3Vy2uqV6xvaix3ykp9beN5u0bntoR7dri9YLgnZ7f/Ih3uh7cMtx/SMzq4Z1Rbxiz8pqbm1atrV6yoWVdjBRiALU+4A2xW9TUNz/5hzDU7R1fvEv1xl+iqXaIx0Yfl5PvdZz93XqLay5/d/ov0PJnDW4bbvw/3XtFlZ44o8V7NzamhQz/v0zfq3Tfq2TfqsUd0xjkjli5bV7nLAEC7CXeAzadm5frrdo6ujat95x+q/Q+7RL/fJbp5/8ebGppKvHDJnFWZas/Obj8jZ3b77m3Pbs88LfWQXtFBvaIDe0UzEmtEJqVSG35/xUt9+0ZxuPdKh/vue0S77RF13yOaPnNF51wYANom3AE2nyfPeT6n2q9Mh/vvdoneenxiiRf2O21EmZNkjk/Pk2k1u731cPtB6XD/Wa/o/JOHFnyvzz9bkKn23ulw79ES7rvuER145BOdcl0AKINwB9hMUqkNmWq/Ol3tVyWq/Xfdot92i4q9sLa6/rzu389uz96T+qt0tZdYuz0T7jmz2w9Nz27PDLcf0Cvav1e0YnlN/tv95tIX+qarvXe62nukq323loco1dY2duZFAqAo4Q6wmTQ3pfKr/Yp0tV/eLbqseLhPfntW/hKQRYfb25rdfmB6uD0O9/16R+PGfJP/dj/e8/6Cw+2ZcF+1urYzLxIARQl3gM0k1ZwqVu2/LRnu/a94Neee1DMS96SenLgntcTa7cnZ7Qe0hPtvzhuZ/3b77PNQTrh3T4R79TorzABsGcIdYPO5KnFDamaSTLba7zl5eLFXFbsn9ZTEE5d+WLs971GpBWe3f1/t6XDfp3eBvy08+OAH2Wrv0XJbareWrbl58z5xCoAWwh1g8/lq7MwrE8Pt2WqPtyWzVxZ7VcHnpGYnyZyYuCe12Nrt+bPbM9W+d+8CIb5uXX12FcjdWs+TuSt6r5OvEABFCXeAzSeV2jD0qjHZSTLZah/T/+MSr8pZuD27BGT2ntTjW9+Tmv+o1ENaqj0z3L5/743hXvBJTO+/P6dn3nD7aeeOaCz7cVEAVJxwB9jcFn6z7PbDBmVuSL3v1BHL568pvX/BlWQKPnHpmMQ9qaVnt++brvaf9o7q6wuvH79i5fo/Xj/mR/s8uOse0Z4HPPzu+7NT5sgAbFHCHWBrV2IlmRMSC7dn70ktONx+UGIxmf3S1R5vexWaKgPA1km4A2zt7r3oxdIryRy7e2615ywBma325Oz2uNqPPHjAlv5wAJRLuANs7T569ZszElPbc1aSST4nNblw+w+TZPLuSd03Ee6PPPThlv5wAJRLuANs7VYtW5ez/mPOSjLJ56Rmhtt/XuiJS5l7UrOz2/fqE82etWJLfzgAyiXcAQJwzQlDk+s/FlxJJn+4/eBeBYbbf6j23tFP+pjgDhAS4Q4QgLnfLDslsf7jL8teSeag7EoyrWe379UnGj3q6y39sQBoB+EOEIZbz38+f2p7frW3eU9qZpKM4XaA4Ah3gDDU1jSUv/5j5jmpP0tvyXtSs5NkPvt0/pb+QAC0j3AHCMaXE75rc2p7/nNS9+udO9x++y3jtvRHAaDdhDtASMY+91VOtR+ZV+2l70n9zYXPmyQDECLhDhCYj96ckaz2glPb86s9c0/q0wM/TYl2gDAJd4DwrF1de/nJw47Mf9xSotpzVpI5+tDHZkxftqVPHICOE+4AoZo+ZcnZRzyZ85DU/JVkjj7ksffenWV6DEDohDtA2BYvWPP4fe8XrPbHHvxw3txV5sYA/HUQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOAAABEO4AABAA4Q4AAAEQ7gAAEADhDgAAARDuAAAQAOEOnWXN2rovpy3ObLPmrSz/hWur6z6e9N3nXy9cvrKmnP2XLl/35gczM9vELxeU85JFS9dmXzJpysLyzy2roaEpe4Tyt+p19fmH+mbWsuwO7bpQG8q7yEuWVWeP/9lXZV2feQtWZ1/y9bdLCu6TcwXaddoVvHodUF/f9NU3iydMmrdg8ZpUKrUph4pfvnhZdfwVev/TOTPnrqirb2zXyzflGlb2a5/8ibdre3fC7Jx3+XbWsux3smZ9Q7s+VGWvZzk/3Nq6xuz+8ZuW/14V/BYB5RPu0FmGv/zF3/zzHzPbfic+Unrn+E/oB5/6aK/jHv6nHjdlXxVv/36n67vuf/fJlw6N/4ws9tqRr36V3T8+QjnnNnDkxOxLDjn98fZ9sLQ4m5LnWeZWsJsvuu6F7A433PNGu06jnIv8zEsb99n3hDZ+EBn3DBiffckpvxlWcJ+cK9Cu067g1SvfqDemHH7Wk/9zz9uSx/zbHa755736HXzaY/Hvln+oxsbm+KqedMnQ/7TrjTknucdRD9xc9WaZfwHblGtY2a998iferu0fu9+Y8y67HvyX7O++9WFZfxvppOv5p/vGtfmS+MjZ/f+/H93W5v4V/BYBHSDcobOUH+73PfH+/7P7n9tMhBMuGlIw34W7cC9t7Hszuux/d5vH731EVZvhVV/fdPej4//HHre2ebRfXjS4xN82C16Hdn2ov45w79Tr+a//5er8fxDIUX64V/BbBHSYcIfOUma4Pz7803aFQv7Ym3AvfZG38XCfPHXRf9zlhvLfZcCwT4odas78VT0Pi8o/1N93ubb/kAnlX4d2fa6/gnDv7OsZb/+tzy0rV68v8ZIyw72C3yJgUwh36CzlNOXbH836t9tfk/MH7S8vGvyH21499bJhPz7moZyR+IKRvTWEexzc5WwLl6zNP5Rw35SrV9qSZdX/+ye3J9/rH7pcd+gZj//+1lfOvWrk/ic9Grda8nf/qcdN62sLT8ueNGVh/r8L/ZdeN8dfuTOvGHHlra8cde6gnQ645293uCZnn0tveLHM69Cuj1bZr/0HE+cWvOb/tc8t2Zec9ttn8ne49YG3ct6lzHDfDNczsx125pMlrkk54V7BbxGwiYQ7dJZymvLws55M/oF396Pjm5qac/Z5/9M52d3emTAr/yBbQ7h34AhZwr1dr22XO/q/k3yj+LOsra7L2SdOt/P/+FzmL5DFZkXPmLPi/+19c/JQ/7xXv/ivnfl7rlpTe8E1z+e045/+MrbgYbeecC9m90Pvy77k9fHTy3lJOeG+ea5ndrvrkXeLnW054V6pbxGw6YQ7dJZymrL7IRv/jC/dlBO/XHDlra8U/C3hLtyLueSGUdl3+fsu19bWFV2lZMHiNZfe8GKxaRU/OurB5Alfd/frpRc8+WDi3O32viP5ko8+n5e/2zYb7pvnema3uKeLzbMqJ9wr9S0CNp1wh85STlMm/yH+gJMf7dgbCXfhXsyJFw/Jvss/dLmusTH333PK8cLrXyfP9sJrXyjnVV9/u+Tvdrw2+6qfHl/gm7lthvtmu57JaTb/vFe/NWtzh8k3lBfuFfkWARUh3KGzlNOUvQ6vyu5TzhIQBQl34V7M5Te9lHyjm6ve7MBBDjrtsewRttv7jhIDrjlypljkPzFg2wz3zruey1a0up45d9wec/5T+ccsJ9wr8i0CKkK4Q2cppykvveHF5J+I/2nXGwcM+6S9A1rCXbgX8+wrXybfKN5+f+srq9bUln+E5Str/s12V2de+2+3v+bTL+aX/9pUKhV/IbNvfd3dr+fssA2Ge6dez5xwj3/l0DMeT/7KQ09/lPOScsJ9079FQKUId+gs5TTl/EVr/qHLdTl/KP6XXjef/8fnxr0/I/9G1YKEu3AvJk695H0Ume3vdrz2uAueji/Lupq2H8X6ylvTsi/s+4v723sCydVODzx1QM7vboPh3qnXMz/cV65en1zyJf5/my+ntVoMvpxw3/RvEVApwh06S5nruCd3y9n+0643nnjxkBEvf1m64LeGcG9ziwOo2KE2Z7j/Y/cb43Zvc9t+nzs3Z7hvytVr07ezlhV7vNe/3f6aQ894/IFBH65YVVPs5Q8PnpDd/8hzBrb33V99+5vsy3fY986c390Gw33zX88Jk+Yl15zdcb+7atZvXKuxzHXcN/FbBFSKcIfOUv6TU9//dM4eRz1Qotv+149vf3z4p6lUquDLhXv54d6BLfRwj81bsPrkS4eWOP5/3OWGG+99o+DQ6TV3jsnudu5VI9v71l9MXZQsvJzv8DYY7lvkeuZMjv/V70Zkf6v8J6duyrcIqBThDp2l/HDPGD126nEXPF3i8YT7n/Roc3OBdhfupS+ycM/46pvFF1zzfM7y4cntv/e99buFq3Ne9YfbXs3ucOLFQ9r7ph9MnJt8C+G+pa5nzmT3wS9Myvx6+eGe0bFvEVApwh06S3vDPaOhoenlN6ed/8fn/qnHTfl/KBZ88MrWEO5tTj45+8pnix1KuG/K1euACZPmXXvXmK77353/YeO/HObsfNcj72Z/d8f97mrve90/8MPsy/9bn1tyfncbDPctdT1zJrv/+52u/2bWsg3tD/esdn2LgEoR7tBZOhbuWU1NzaPHTu37i/uTfyL+Q5frlq1Yl7NnctrrTgfcU87BkzdfHvvrp9t7bhvcnBrIzamlffrF/PzJD/HfG5P7xLWa/N3k9OhynPOHkSVaeVOuw+b52lc83Lfg9cyZ7N7toHvr65s6HO5Z5XyLgEoR7tBZNjHcMxobm486d1DyT8T8Bd3iPzizv/tvtru6nLVozrvquexLfn318x04MeH+VxDuGXcmxoD/Jm/+Rm1dY3Lho1vuf6v8Iy9eVv2P3W/MvjZ+o5wdNuU6bJ6vfcXDfctez9sefDu5w8XXj9r0cM8o/S0CKkW4Q2cppykLPsswx4LFa5J/Il556ys5O6ytrvvX/3J1doepM5a2ecy9f9k/u/99T7xfzsfJIdyDCPdyvmCxHfbduIrOHkc9kPO7PztlQPZ3/27Ha79NT7Eox+FnPZn8mJV9ANPm+dp3xgOYtuD1TKVS+5/0aHKf5Ff9f+5ZONwr8i0CKkK4Q2dpsymr19X/tz63PDrs4zYPlbxj9dIbXszfoc+RG2fUtDmUOPHLBcl/Mf/869w//ssh3IMI94NPe+zCa19o85FeyYA+gF8AABd+SURBVH/V2S3vRtjnXvsqebZxk5UzvD1s9OTkqwpOQ9/E67AZvvadEe5b9nrG+/yPPW7N7vO3O2y8JsVG3CvyLQIqQrhDZ2mzKW994K1sGi5csrbYcabOWJr8w3jQc5/l73Nz1ZvJfYaMmlTsaCtW1Wy39x3ZPf/PXv0KrlTTJuG+9Yd7dgWSOHDjbC22Wxxk/+vHt2dP5pw/FFij8KDTHkue8D4n9C/xjY09MvTjf7/T9dn9/812V0+ZviR/t028Dpvha98Z4b5hS1/P8R/PTv5jRelwr+C3CNh0wh06S+mmrF5Xn3ygyX/Y+fob731j9ncrk/usq6kfOHLif+97a/IP1xlzVuS/V3y0/7v7n5K7xbm5ZFl1zm5PPjsxZx23OAg69umE+9Yf7jl1ePaVz370+bzkDnG8jnn3258e/3Byt4L/BBRn5f/c87bkbvH37YXXv87fM07ko897KqcIHx48oeAZbuJ12Axf+04K9y1+PW9q/XeeEuFewW8RsOmEO3SW0k05d/6qLoVWUut9RFUcl3v/sv8/79Uvf1SsxHyAES9/mbNz/PI4O06+dOjlN730s1MG5D/48JDTH+/YcPuG9i9omNn6PfxO/qGS4f5/9upX4uVxQ7TrImdsnnAv/cGfav3vJBW8esXEP9mc25oz23Z735E52k4H3JO8SzKz9TwsKrbOyZfTFud/hf5zz5viYjvzihFX3vrKEWcPjI+ZnHqR2fLvyqjINczo7K99J4X7hs1yPUucZP5k94LhXvFvEbCJhDt0ljabsrau8ZIbRhX8N+uC26FnPF56LmzO8xFLb/EfrmXec1ZQex8hlNkKrkeeDPfS2993uba9F3nD5gr30tutD7zVSVevtIee/uj/6lb0kV753VZ6wsac+avir035Jxz/vPIXQarUNczq1K9954X7hs6/nqXPc9mKdf+1zy05X4CCe1b2WwRsCuEOnaXM5SCnzlha+kHif5NeeuLym16qXtf2s8Sfe+2r/9Kr6EMNs1sco+trN2lITLgHEe6x5Str/tjvtX/XNXdYNGc77oKnp89e3ubR6uubbrjnjfgH0ebZ7v3L/pOnLip9tIqE+4bO/Np3arhv6OTr2eap5kx2L7EcZGW/RUCHCXfoLO1ax33R0rWPD//0+AsH/++fbLzBK+71LvvffcE1z89ftKb8941T4IkRn/7yosE5w2l/u8M1ex33cFwJOTPpO0a4hxLuGetq6uO6Pf+Pz+126H3JVou/b0ef99Qnk+e362jzFqz+/a2vxF+n/JLbbu87Trx4yNAXJ5dznEqF+4ZO+9p3drhndNL1LOclN977Rnb/Ntdxr+y3COgA4Q5bnbXVdR9MnBt3RirVwQnoWStW1Uyeuig+2tz5q8pZco5tQdy4EybNmzpjaUND0yYeKv6KLl5WPWnKwvc/nTNz7oq6+saKnOEmCvdrv3Vez4Iq+C0CyifcAQAgAMIdAAACINwBACAAwh0AAAIg3AEAIADCHQAAAiDcAQAgAMIdAAACINwBACAAwh0AAAIg3AEAIADCHQAAAiDcAQAgAMIdAAACINwBACAAwh0AAAIg3AEAIADCHQAAAiDcAQAgAMIdAAACINwBACAAwh2ogC+mLnrzg5mZbeKXC+rrm4rt+d4nc76ZtSz5K2ur6+JXLVuxruD+NesbRrz8Zb+H33nlrWnV6+qLHXbIqEnftj5s9sTe/3ROzi/Onb8qfsfm5lT+/u9OmJ39INmt4PumUqnXx0+/65F3h42evHhZdbETK/8jlLZ0+bqBIyfe/tDbo8dObWgoenkz4it8/8APHx48Yfrs5SV2iz/s198uyfnFyVMXffrF/GIv+W7h6idGfBp/6vjn2NjYXHCfr75ZPGHSvJxffGfCrIInE59DwR9c0gcT5+b/UOItPocSr4p3mL9oTYkd5i1YHe+zvrYh+YuZb+PylTWbeA4V+aED5BDuQAUcde6gv/nnP2a3v93hmvOueq5gGf/XPrdcdN0LyV/5eNJ38UtGvTElf+e4//5731vj39390Pv+Xdfr/m7Hax96+qP83eLoj/epGvhBsRN7cWyrg9/R/534F2vrGvP3/8fuNyY/SGb77KsFObvFYfeTYx+Kf6vL/nf/5543xf9x9pXPFvy8ZX6E0m578O34hf9jj1vjg8SH2nG/u6ZMzw3ujHU19SddMjTeZ+ef3bPDvnfG/3HmFSMKftLMh/2Pu9wQt3jyFw8/68kfHfVgwf0HDPvk77tc+w9drotP41//y9Xxj7Jgtp548ZBuB92b84v/Yefrf3fzywXP4Tc3ji74dln/Z69++T+UeItPoNhL4r8nxDvEl6LEYe8ZMD7e5/KbXkr+Yubb+PKb0zblHCryQwfIJ9yBCoj7OG6UzH+vWlP7ylvT4rz7y+Pv5e9ZfrjHuRmnatxemeHPxsbmfg9/H9yf/P/t3XnQXfVdx/EZi1Z0sEOr7djpWAcq2MZCKRS7UamFqdIF0SJ2AUGr02J1sGDVLMSwN5CghIaaQGllCVvZSlnClhLaLDQQIJAiSZoEEyCFACGhELL4TY4+vdwtD3memfgZX6+5fyQnv9x7fuc8f7zPec459/7288HbDPc37XdKrdXAwv7hvs2OLH/yhYtHHHz2wCnkO2ctrmOVs6bctd1T6KPmtdPuIy+9bn7z11VPrT3wiCn7fnzSpk1djhNqvrXlZ8xe0vx1+sxHqxo/d9xlXd+5OUo56LPnty7sFe7zHlxRgydMnfniS1u223NrXjz82Etqb657YX3byGEP9wF3zflxrcMdP1i8zZFHH39lrVsdZqx+9oVeY5pwr9fs+372+4Fe4T74dRiWnQ7QlXAHhkFruDfe/bFzKuw6Rw4+3JvlrSfLN27cVBn6z1+9uW1k/3D/jfef8bp3/stffuWqgYVDD/eK4xNOfUWGfuQzU9//x+dt9xR62bBh4+v3Hnfk31/eurCysmsI3vfQylo+duKtrQtHjr+5Fj7S7XKUmmztpvrXb3173sDCXuHebLS163521UdzVvumGY+0jdzh4V4rWTvokmvnv3HfU8791qxew5pwr5/bdxw0ceDirqGH+9B3OkAvwh0YBm3h/vQz63bda1xb2jYGH+7Pr33pV35nbDVrxWv/T+8T7of99UX7HHLOhVf+sAbcOvPRZuHQw/2gz55fbVrT7D9s8FPopeq8VvXyGx5oXVhrXuH4+Ko1bYPPmnJXDV755CuWL1r6dC3s2q+1j44b951jTriyZj1wmX6vcG+Cdcq0udtc5x0e7v9+6ZxdRoxdv35DzW7vVx5Ptjr7grub45+q6lFn3tIsHHq4D32nA/Qi3IFhUOFeRT524q31Ovr4K6sIDz/2krbb/hqv6hr3K777wM57jqkKnHrZ3K7v1thmuG/emtpvee/pzW2C/cO9srWZSPMauOyk1cJFq976gTN+7d0nj/vX21Y80e8OyEFOoZdrpz9Uqzrr3mWDGfyPp99Uydi28OWXN75mt5Ftp+EbTbg/89xP37TfKdXrzcI+17jX+9fKHHL0hTfcvrDrhTqNHR7u7zts8l/907frD/cu2HJ5z7wH229RaDThXtM/ffKMnXYf2dzJMPRw3zzknQ7Qi3AHhkGFe5XZgUdMqdfeW2+g/OiRF3SeEt78KsO9LFm++oujrnntHqN3GTH20387resDT/pfKtP8KuCxlc/WOzQf3T/cq++biTSvb141r3PY5q2PHzl50h3V7pXFf3DUN9pOir/aKfRy5Xcf7Hp3bFdfOvG6rvdK/vLbT+z624+BaL7+tocHzuv3Cfcyc+6PD/38ltsG6ril/u+qp7o8C2jHhnsdU9WY7835n8Ott39kYtvP24DmUpnVz76wYcPGOrobcfDZdZAzLOG+eWg7HaAX4Q4Mg7ZLZZavePb1e4/78J9N6Rz5asO9UXX1bxd+v+rqF/cc/cDCx9v+dTDhXiZfNLuGVXgN/VKZAevXb5h2/f0Vu9u8jKT/FHr5/g+XtmZof2MmTP/5t41qOxf+wk/X1zucMumOzvGtk63afsO7Tnpq9br+4d5YtPTp+qw373/a7h8a3/nozx0b7nWIsute4wYe13jMCVt+/9PcUNtmINw3b32EZW26OhIbrnBvbN9OB+hFuAPDoPPm1KrznXYf2TnyrR84o1qqdcmdsxZXCd1y13+2jVy4aFXbI9jXvbC+3nP0Wbe0jRxkuJcDDv/6b37wq6eee2eN7xpzg+nIx1et6Xz+d8Vuvfl2T6GXJ3/yfNvNo5u3Plhm7MRbOx/BftHV99bg+tDWhbPuXVYLr755Qeebt062kr3C/XPHXdYr3Ot92j7xxjt/1HrnwICjvnzFbgeMb12yYcPGyuKR47vcnTm84V7HUc3TOdteF19zX+fg1nAvtUlrJS+9bn4trKlt9zoMfacD9CLcgWHQGe6f+uLF1eidI//wz7+x+4fGtz7yfMyE6VVCS5avbhs56sxbKndaH+NY/+uXfnvMV067sW3k4MN90dKnd95zzBv3PWUoZ9ynz3y089nwHzvmm7/7R1/b7in08cFPfX2/T0xqPbF9/mX31AosX/Fs28gK+l/4rVFHH/+K46LaEb/+nlO7fmdT22Srbutta+N0Dfdajfd88tzWJXPmL6/xN9y+sG3k6ZNnvGa3kYuXPT2w5La7F9XICy6/Z5vr0N82o/mqG7dcWdT2TU+//+mpbY+8bLSFe23hEQef3fxsDOWM+7DsdICuhDswDKqP3/Z7Zw5cn3Da17ac0j7pnNs7R37ntoX1T0d9+YqHH33yqdXrqkF3GTG264MjH1u55Xqbdxw08drpDz2/9qXZ9y3/i3+4qpKoyqlt5ODDvZy59dErfcK9Srft2zHbnh5THfa+wybXup138ez66JrIGedtSdUK1u2eQh8zZi+p/1Ix3dwme++CFW/e/7TWp1u2qnWoqf3p31wy/+GV9XGHfv4/asV6nT/ujObmmp+u4d7suBrwg3nL1q576aYZj1TK1yFB54PSVz655nXv3HKP7933LF3z/Iv16Xt8+KzdDhhff+66Dm0bvM/G2WY01+q1HV2UqZfN7Xpk2Bbum7du29rUQwz3YdnpAF0Jd2AYtH1zar2OHX1t12tRypRpc9/wrpOaYbvuNW7sxFs7r5Nu3L/w8Y8eecFr9xhdI3fec0z1aNfnq7yqcN+0adM+h5zTJ9w7L7SY3nE1SH1ic/F0M+DAI6Zccu38oUyhv7nzH9v/0HObz6oQ/8LIazq/9mhAbd63vPf0ZnD9Ydr19/ca2RnuT/zk+TqO6nWN+9U3L9jvE5Oad/7VfU7+0onXLfuvZ7qOrEitcv25//0a3c/83bSudypv7rbBa0mvFe4fzaueWlsbZ8LUmW3Lq55rHcZMmN62vDPcN2+9RH7o17gPy04H6CTcgR3g5Zc3/mjxqrvvWTqYZ11X1s97cEWvw4AdqI4BFjzyRPMFmf0NyxTqaKEKfjCPF2xWbOGiVX0e2rjdnlvzYs1lm+9cAyrrvzdnSfMIzv+H/s/+3AK5hDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAAB/hsvohAcYDRc8wAAAABJRU5ErkJggg==";

// ── BRAND ──────────────────────────────────────────────────────
const C = {
  navy: "#2c3792", magenta: "#bf2293", purple: "#5c2f92",
  lightNavy: "#3d4db5", dark: "#07071a", darker: "#050510",
  glass: "rgba(255,255,255,0.05)", glassBorder: "rgba(255,255,255,0.09)",
  muted: "#6b7094", white: "#ffffff"
};

const grad = (deg = 135) => `linear-gradient(${deg}deg, ${C.magenta}, ${C.purple} 50%, ${C.navy})`;
const gradText = { background: grad(120), WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

// ── GLOBAL STYLES ───────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#07071a;color:#fff;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-thumb{background:linear-gradient(${C.magenta},${C.navy});border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(2deg)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes orbitSpin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes particle{0%{opacity:0;transform:translateY(0) scale(0)}10%{opacity:1}90%{opacity:.3}100%{opacity:0;transform:translateY(-120vh) scale(.5)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes tiltIn{from{opacity:0;transform:perspective(800px) rotateX(20deg) translateY(30px)}to{opacity:1;transform:perspective(800px) rotateX(0deg) translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes borderGlow{0%,100%{box-shadow:0 0 0 0 rgba(191,34,147,0)}50%{box-shadow:0 0 30px 5px rgba(191,34,147,.25)}}
`;

// ── PARTICLE SYSTEM ─────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    const COLORS = ["#bf2293", "#5c2f92", "#2c3792", "#3d4db5", "#7a2b92"];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
      r: Math.random() * 2.5 + .5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * .6 + .1,
    }));

    const MAX_DIST = 120;
    const MOUSE_DIST = 180;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particles.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * .03;
          p.vx -= dx * force; p.vy -= dy * force;
        }
        p.vx *= .98; p.vy *= .98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * .15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(191,34,147,${alpha})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: .7 }} />;
}

// ── 3D TILT CARD ───────────────────────────────────────────────
function TiltCard({ children, style = {}, intensity = 15 }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(10px)`;
  };
  const handleLeave = () => { ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateZ(0)"; };
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transition: "transform .15s ease", transformStyle: "preserve-3d", willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

// ── SHARED COMPONENTS ───────────────────────────────────────────
function GradText({ children }) {
  return <span style={gradText}>{children}</span>;
}

function Badge({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", background: "rgba(191,34,147,.1)", border: "1px solid rgba(191,34,147,.3)", borderRadius: 50, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4a0ff", marginBottom: 24 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.magenta, animation: "pulse 2s ease infinite", display: "inline-block" }} />
      {children}
    </div>
  );
}

function SectionTag({ children }) {
  return <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.magenta, fontWeight: 600, marginBottom: 10 }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", style = {} }) {
  const [hov, setHov] = useState(false);
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "0.03em", cursor: "pointer", border: "none", transition: "all .25s", ...style };
  if (variant === "primary") return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: grad(), color: "#fff", boxShadow: hov ? "0 16px 40px rgba(191,34,147,.5)" : "0 8px 25px rgba(191,34,147,.3)", transform: hov ? "translateY(-2px)" : "none" }}>
      {children}
    </button>
  );
  if (variant === "outline") return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? "rgba(255,255,255,.08)" : C.glass, border: `1px solid ${hov ? "rgba(255,255,255,.3)" : C.glassBorder}`, color: "#fff", backdropFilter: "blur(10px)", transform: hov ? "translateY(-2px)" : "none" }}>
      {children}
    </button>
  );
  if (variant === "ghost") return (
    <button onClick={onClick} style={{ ...base, background: "transparent", color: C.muted, padding: "8px 16px" }}>{children}</button>
  );
}

// ── 3D FLOATING ORB ────────────────────────────────────────────
function FloatingOrb({ size, color, top, left, right, bottom, delay = 0, blur = 80 }) {
  return (
    <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: color, filter: `blur(${blur}px)`, opacity: .12, top, left, right, bottom, animation: `float ${8 + delay}s ease-in-out infinite`, animationDelay: `${delay}s`, pointerEvents: "none" }} />
  );
}

// ── NAV ─────────────────────────────────────────────────────────
const SERVICES_NAV = [
  { id: "fibre", label: "Fibre Connectivity" },
  { id: "5g", label: "5G Solutions" },
  { id: "ict", label: "ICT Solutions" },
  { id: "analytics", label: "Business Analytics" },
  { id: "iot", label: "Internet of Things" },
  { id: "digital", label: "Digital Advertising" },
];

function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servOpen, setServOpen] = useState(false);
  const isMobile = window.innerWidth < 900;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services", dropdown: true },
    { label: "Coverage", id: "coverage" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: isMobile ? "14px 20px" : "14px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(7,7,26,.97)" : "rgba(7,7,26,.6)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,.08)" : "transparent"}`, transition: "all .3s" }}>
      
      <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <img src={`data:image/png;base64,${ICON_B64}`} alt="logo" style={{ height: 36 }} />
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.08em" }}>ISU ELIHLE SOLUTIONS</div>
          <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted }}>Business Consultants</div>
        </div>
      </div>

      {/* Desktop */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {navLinks.map(l => (
            <div key={l.id} style={{ position: "relative" }}
              onMouseEnter={() => l.dropdown && setServOpen(true)}
              onMouseLeave={() => l.dropdown && setServOpen(false)}>
              <button onClick={() => !l.dropdown && setPage(l.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: page === l.id || (l.dropdown && SERVICES_NAV.some(s => s.id === page)) ? "#fff" : C.muted, letterSpacing: "0.04em", transition: "color .2s", padding: "4px 0", display: "flex", alignItems: "center", gap: 4, borderBottom: page === l.id ? `2px solid ${C.magenta}` : "2px solid transparent" }}>
                {l.label} {l.dropdown && <span style={{ fontSize: 10 }}>▾</span>}
              </button>
              {l.dropdown && servOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", background: "rgba(7,7,26,.97)", border: `1px solid ${C.glassBorder}`, borderRadius: 16, padding: "12px 8px", minWidth: 220, backdropFilter: "blur(20px)", marginTop: 8, zIndex: 100 }}>
                  {SERVICES_NAV.map(s => (
                    <button key={s.id} onClick={() => { setPage(s.id); setServOpen(false); }}
                      style={{ display: "block", width: "100%", padding: "10px 16px", background: "none", border: "none", color: C.muted, fontFamily: "'DM Sans',sans-serif", fontSize: 13, cursor: "pointer", textAlign: "left", borderRadius: 10, transition: "all .15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(191,34,147,.1)"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.muted; }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Btn onClick={() => setPage("order")} style={{ padding: "9px 22px", fontSize: 13 }}>Get Connected</Btn>
        </div>
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}>
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2, transition: "all .3s", transform: open && i === 0 ? "rotate(45deg) translate(5px,5px)" : open && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : open && i === 1 ? "opacity(0)" : "none" }} />)}
        </button>
      )}

      {/* Mobile menu */}
      {isMobile && open && (
        <div style={{ position: "fixed", top: 70, left: 0, right: 0, background: "rgba(7,7,26,.98)", backdropFilter: "blur(30px)", padding: "24px 24px", borderBottom: `1px solid ${C.glassBorder}`, zIndex: 400, display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(l => (
            <div key={l.id}>
              <button onClick={() => { if (!l.dropdown) { setPage(l.id); setOpen(false); } else setServOpen(!servOpen); }}
                style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "14px 16px", background: "none", border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 16, cursor: "pointer", borderBottom: `1px solid ${C.glassBorder}`, textAlign: "left" }}>
                {l.label} {l.dropdown && <span>{servOpen ? "▴" : "▾"}</span>}
              </button>
              {l.dropdown && servOpen && SERVICES_NAV.map(s => (
                <button key={s.id} onClick={() => { setPage(s.id); setOpen(false); setServOpen(false); }}
                  style={{ display: "block", width: "100%", padding: "12px 32px", background: "rgba(191,34,147,.08)", border: "none", color: C.muted, fontFamily: "'DM Sans',sans-serif", fontSize: 14, cursor: "pointer", textAlign: "left", borderBottom: `1px solid ${C.glassBorder}` }}>
                  {s.label}
                </button>
              ))}
            </div>
          ))}
          <div style={{ paddingTop: 16 }}>
            <Btn onClick={() => { setPage("order"); setOpen(false); }} style={{ width: "100%", justifyContent: "center" }}>Get Connected</Btn>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── WHATSAPP FLOAT BUTTON ───────────────────────────────────────
function WhatsAppButton() {
  const [hov, setHov] = useState(false);
  return (
    <a href="https://wa.me/27000000000?text=Hi%20Isu%20Elihle%20Solutions%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
      target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "fixed", bottom: 32, right: 32, zIndex: 300, width: hov ? "auto" : 60, height: 60, borderRadius: hov ? 50 : "50%", background: "#25d366", display: "flex", alignItems: "center", gap: hov ? 10 : 0, padding: hov ? "0 20px" : 0, justifyContent: "center", boxShadow: "0 8px 25px rgba(37,211,102,.4)", transition: "all .3s", textDecoration: "none", overflow: "hidden", whiteSpace: "nowrap" }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {hov && <span style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500 }}>Chat with us</span>}
    </a>
  );
}

// ── HOME PAGE ───────────────────────────────────────────────────
function HomePage({ setPage }) {
  const isMobile = window.innerWidth < 768;
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <FloatingOrb size={600} color={C.navy} top={-150} right={-150} delay={0} />
      <FloatingOrb size={400} color={C.magenta} bottom={100} left={"20%"} delay={-3} />
      <FloatingOrb size={300} color={C.purple} top={"40%"} left={-80} delay={-5} />

      {/* Hero */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "110px 24px 60px" : "0 80px 0", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 700, animation: "fadeUp .9s ease both" }}>
          <Badge>100% Black-Owned ICT · B-BBEE Level 1 · Eastern Cape</Badge>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.2rem,5.5vw,5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 28 }}>
            Connecting Africa to a<br /><GradText>Brighter Digital Future</GradText>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: "rgba(255,255,255,.6)", lineHeight: 1.75, maxWidth: 560, marginBottom: 40, fontWeight: 300 }}>
            Bridging the digital divide with affordable fibre, 5G, and integrated ICT solutions — built for communities, businesses, and institutions across South Africa.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
            <Btn onClick={() => setPage("coverage")}>Check My Coverage →</Btn>
            <Btn onClick={() => setPage("services")} variant="outline">Explore Services</Btn>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["100%", "Black-Owned"], ["B-BBEE", "Level 1"], ["1Gbps", "Max Speed"], ["5G", "Ready"]].map(([n, l]) => (
              <TiltCard key={l} style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 16, padding: "16px 24px", textAlign: "center", minWidth: 90, backdropFilter: "blur(20px)" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, ...gradText }}>{n}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginTop: 3 }}>{l}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Services strip */}
      <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px 60px" : "0 80px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <SectionTag>What We Offer</SectionTag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            End-to-end ICT <GradText>Solutions</GradText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16 }}>
          {[
            { id: "fibre", icon: "⚡", title: "Fibre Connectivity", desc: "Ultra-fast FTTH & FTTB up to 1Gbps", color: C.magenta },
            { id: "5g", icon: "📡", title: "5G Solutions", desc: "Wireless connectivity for rural & urban SA", color: C.purple },
            { id: "ict", icon: "🖥️", title: "ICT Solutions", desc: "Hardware, software & managed services", color: C.navy },
            { id: "analytics", icon: "📊", title: "Business Analytics", desc: "Data intelligence & predictive insights", color: C.lightNavy },
            { id: "iot", icon: "🔗", title: "Internet of Things", desc: "Smart agriculture, logistics & cities", color: "#7a2b92" },
            { id: "digital", icon: "📣", title: "Digital Advertising", desc: "AI-powered SEM & social media", color: C.magenta },
          ].map(s => (
            <TiltCard key={s.id} intensity={10}>
              <div onClick={() => setPage(s.id)}
                style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 20, padding: "28px 24px", cursor: "pointer", transition: "all .3s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "55"; e.currentTarget.style.background = s.color + "10"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.glassBorder; e.currentTarget.style.background = C.glass; }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }}>{s.desc}</div>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>Learn more →</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ position: "relative", zIndex: 2, margin: isMobile ? "0 24px 80px" : "0 80px 100px", background: `linear-gradient(135deg, rgba(191,34,147,.15), rgba(44,55,146,.15))`, border: `1px solid rgba(191,34,147,.2)`, borderRadius: 24, padding: isMobile ? "36px 28px" : "56px 64px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 32, animation: "borderGlow 4s ease infinite" }}>
        <div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 800, marginBottom: 12 }}>Ready to get <GradText>connected?</GradText></h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, maxWidth: 420 }}>Check coverage in your area and place your order in minutes.</p>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Btn onClick={() => setPage("coverage")}>Check Coverage →</Btn>
          <Btn onClick={() => setPage("contact")} variant="outline">Talk to Us</Btn>
        </div>
      </div>

      {/* Partner */}
      <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px 80px" : "0 80px 100px", textAlign: "center" }}>
        <SectionTag>Our Partners</SectionTag>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 32 }}>Backed by Trusted Networks</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {["VOX"].map(p => (
            <div key={p} style={{ padding: "16px 36px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "0.06em", color: "rgba(255,255,255,.7)" }}>{p}</div>
          ))}
          <div style={{ padding: "16px 36px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, fontSize: 13, color: C.muted, fontStyle: "italic" }}>More coming soon</div>
        </div>
      </div>
    </div>
  );
}

// ── SERVICE PAGE TEMPLATE ───────────────────────────────────────
const SERVICE_DATA = {
  fibre: {
    icon: "⚡", title: "Fibre Connectivity", subtitle: "FTTH & FTTB", color: C.magenta,
    hero: "Internet at the speed of light",
    desc: "Ultra-fast, reliable fibre-to-the-home and fibre-to-the-business installations. Direct connectivity to your doorstep — even in underserved areas. As a certified Vox Telecom Reseller Partner, we bring enterprise-grade fibre to communities that need it most.",
    features: ["Symmetrical upload & download speeds", "Up to 1Gbps residential packages", "Business-grade SLA guarantees", "Sub-contracting for major fibre operators", "Network design & managed connectivity", "24/7 technical support"],
    plans: [{ name: "Home 50", speed: "50Mbps", price: "R399", ideal: "Light browsing & streaming" }, { name: "Home 200", speed: "200Mbps", price: "R699", ideal: "Remote work & HD video" }, { name: "Home 1G", speed: "1Gbps", price: "R999", ideal: "Power users & gaming" }, { name: "Business", speed: "Custom", price: "Custom", ideal: "Enterprise solutions" }],
  },
  "5g": {
    icon: "📡", title: "5G Solutions", subtitle: "Wireless Connectivity", color: C.purple,
    hero: "Blazing fast, no cables needed",
    desc: "Advanced 5G network deployments especially for rural and semi-urban areas — offering flexible, high-speed wireless connectivity where fibre isn\'t yet available. The future of connectivity is wireless, and we\'re bringing it to South Africa.",
    features: ["Rural & semi-urban coverage focus", "Fixed wireless home broadband", "Business wireless backup solutions", "Portable hotspot solutions", "5G small cell deployments", "Low-latency applications support"],
    plans: [{ name: "5G Home", speed: "100Mbps", price: "R499", ideal: "Rural households" }, { name: "5G Business", speed: "500Mbps", price: "R1,299", ideal: "SMEs without fibre access" }],
  },
  ict: {
    icon: "🖥️", title: "ICT Solutions", subtitle: "Hardware & Software", color: C.navy,
    hero: "Your complete technology partner",
    desc: "Your one-stop-shop for all ICT needs. From hardware and software reselling to network design and IT consulting — we handle everything end to end, so you can focus on running your business.",
    features: ["Hardware: computers, networking gear, POS", "Software: OS, productivity, cybersecurity", "Network infrastructure design", "IT support & managed services", "Cloud migration consulting", "Microsoft 365 & Azure solutions"],
    plans: [],
  },
  analytics: {
    icon: "📊", title: "Business Analytics", subtitle: "Data Intelligence", color: C.lightNavy,
    hero: "Turn data into decisions",
    desc: "Comprehensive data services covering management, security intelligence, monitoring, data mining, and advanced analytics — applied across supply chain, HR, and ERP functions for smarter business decisions.",
    features: ["Predictive & prescriptive analytics", "Business intelligence dashboards", "Supply chain optimisation", "HR analytics & workforce planning", "ERP data integration", "Custom reporting solutions"],
    plans: [],
  },
  iot: {
    icon: "🔗", title: "Internet of Things", subtitle: "Smart Connectivity", color: "#7a2b92",
    hero: "Connect everything, control everything",
    desc: "Platform solutions for device and connectivity management, application enablement, and professional services — focusing on smart agriculture, manufacturing, logistics, and smart cities across South Africa.",
    features: ["Smart agriculture monitoring", "Industrial IoT for manufacturing", "Fleet & logistics tracking", "Smart city infrastructure", "Remote asset monitoring", "Training, consulting & support"],
    plans: [],
  },
  digital: {
    icon: "📣", title: "Digital Advertising", subtitle: "Powered by Inala Agency", color: C.magenta,
    hero: "Be seen. Be heard. Convert.",
    desc: "AI-powered SEM, interactive social media ads, content marketing, programmatic advertising, and full campaign management. Our Digital Advertising services are delivered in partnership with Inala Agency — specialists in digital marketing for the African market.",
    features: ["AI-powered search engine marketing", "Programmatic display advertising", "Social media campaign management", "Content creation & strategy", "Performance analytics & reporting", "Full-service digital campaigns"],
    plans: [],
    partner: { name: "Inala Agency", url: "https://inala.agency", note: "Digital Advertising services are delivered in partnership with Inala Agency. Click below to visit their website for a dedicated consultation." },
  },
};

function ServicePage({ serviceId, setPage }) {
  const s = SERVICE_DATA[serviceId];
  const isMobile = window.innerWidth < 768;
  if (!s) return null;

  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "100px 24px 60px" : "120px 80px 80px", position: "relative" }}>
      <FloatingOrb size={500} color={s.color} top={-100} right={-100} delay={0} />
      <FloatingOrb size={300} color={C.navy} bottom={200} left={-80} delay={-4} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, fontSize: 13, color: C.muted }}>
          <span onClick={() => setPage("home")} style={{ cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color=C.muted}>Home</span>
          <span>›</span>
          <span onClick={() => setPage("services")} style={{ cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color=C.muted}>Services</span>
          <span>›</span>
          <span style={{ color: s.color }}>{s.title}</span>
        </div>

        {/* Hero */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 60, alignItems: "center", marginBottom: 80 }}>
          <div style={{ animation: "fadeUp .8s ease both" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: s.color, fontWeight: 600, marginBottom: 12 }}>{s.subtitle}</div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
              <GradText>{s.hero}</GradText>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.6)", lineHeight: 1.75, fontWeight: 300, marginBottom: 32 }}>{s.desc}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn onClick={() => setPage("coverage")}>Check Coverage →</Btn>
              <Btn onClick={() => setPage("contact")} variant="outline">Get a Quote</Btn>
            </div>
          </div>

          {/* 3D Icon */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", animation: "scaleIn .9s ease .2s both" }}>
            <TiltCard intensity={20} style={{ width: 260, height: 260, background: `linear-gradient(135deg, ${s.color}22, ${C.navy}22)`, border: `1px solid ${s.color}44`, borderRadius: "30%", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(20px)", boxShadow: `0 0 80px ${s.color}30` }}>
              <span style={{ fontSize: 100, filter: "drop-shadow(0 0 30px rgba(255,255,255,.3))", animation: "float 6s ease-in-out infinite" }}>{s.icon}</span>
            </TiltCard>
          </div>
        </div>

        {/* Features */}
        <div style={{ marginBottom: 60 }}>
          <SectionTag>What\'s Included</SectionTag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Everything you need</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 16 }}>
            {s.features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 14, animation: `tiltIn .5s ease ${i * .08}s both` }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,.75)" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        {s.plans.length > 0 && (
          <div style={{ marginBottom: 60 }}>
            <SectionTag>Pricing</SectionTag>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Choose your plan</h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : `repeat(${s.plans.length},1fr)`, gap: 16 }}>
              {s.plans.map((p, i) => (
                <TiltCard key={i} intensity={12}>
                  <div style={{ background: i === 1 ? `linear-gradient(135deg, ${s.color}25, ${C.navy}25)` : C.glass, border: `1px solid ${i === 1 ? s.color + "55" : C.glassBorder}`, borderRadius: 20, padding: "28px 20px", textAlign: "center", position: "relative" }}>
                    {i === 1 && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: grad(), borderRadius: 50, padding: "3px 14px", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>POPULAR</div>}
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, ...gradText }}>{p.price}<span style={{ fontSize: 12, fontWeight: 400 }}>/mo</span></div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, margin: "8px 0 4px" }}>{p.name}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: s.color, marginBottom: 6 }}>{p.speed}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{p.ideal}</div>
                    <div style={{ marginTop: 20 }}>
                      <Btn onClick={() => setPage("order")} style={{ fontSize: 13, padding: "9px 20px", width: "100%", justifyContent: "center" }}>Order Now</Btn>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* Partner callout for Digital */}
        {s.partner && (
          <div style={{ background: "linear-gradient(135deg, rgba(191,34,147,.12), rgba(44,55,146,.1))", border: "1px solid rgba(191,34,147,.25)", borderRadius: 20, padding: "36px 40px", textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🤝</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Powered by <GradText>{s.partner.name}</GradText></h3>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 14, lineHeight: 1.65, maxWidth: 480, margin: "0 auto 24px", fontWeight: 300 }}>{s.partner.note}</p>
            <Btn onClick={() => window.open(s.partner.url, "_blank")}>Visit Inala Agency →</Btn>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 20, padding: "36px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Ready to get started?</h3>
            <p style={{ color: C.muted, fontSize: 14 }}>Check coverage in your area or speak to our team.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn onClick={() => setPage("coverage")}>Check Coverage</Btn>
            <Btn onClick={() => setPage("contact")} variant="outline">Contact Us</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SERVICES OVERVIEW PAGE ──────────────────────────────────────
function ServicesPage({ setPage }) {
  const isMobile = window.innerWidth < 768;
  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "100px 24px 60px" : "120px 80px 80px", position: "relative" }}>
      <FloatingOrb size={500} color={C.purple} top={-100} right={-100} delay={0} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Badge>Our Services</Badge>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16, maxWidth: 600 }}>
          Integrated ICT Solutions<br /><GradText>for Every Scale</GradText>
        </h1>
        <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>From home fibre to enterprise IoT — one trusted partner for your entire digital journey.</p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 20 }}>
          {Object.entries(SERVICE_DATA).map(([id, s], i) => (
            <TiltCard key={id} intensity={8}>
              <div onClick={() => setPage(id)}
                style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 22, padding: "32px 28px", cursor: "pointer", transition: "all .3s", display: "flex", gap: 24, alignItems: "flex-start", animation: `tiltIn .5s ease ${i * .1}s both` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "55"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.glassBorder; e.currentTarget.style.transform = "none"; }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: s.color + "22", border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: s.color, marginBottom: 10, fontWeight: 600 }}>{s.subtitle}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.65, fontWeight: 300 }}>{s.hero}</div>
                  <div style={{ marginTop: 16, fontSize: 12, color: s.color, fontWeight: 600 }}>Explore →</div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── COVERAGE PAGE ───────────────────────────────────────────────
const COVERAGE_AREAS = [
  { name: "East London", province: "Eastern Cape", lat: -33.0153, lng: 27.9116, status: "full", speed: "Up to 1Gbps" },
  { name: "Butterworth", province: "Eastern Cape", lat: -32.3314, lng: 28.1497, status: "full", speed: "Up to 500Mbps" },
  { name: "Mthatha", province: "Eastern Cape", lat: -31.5887, lng: 28.7836, status: "partial", speed: "Up to 200Mbps" },
  { name: "King William\'s Town", province: "Eastern Cape", lat: -32.8786, lng: 27.3967, status: "full", speed: "Up to 500Mbps" },
  { name: "Bhisho", province: "Eastern Cape", lat: -32.8504, lng: 27.4387, status: "full", speed: "Up to 500Mbps" },
  { name: "Queenstown", province: "Eastern Cape", lat: -31.8987, lng: 26.8751, status: "partial", speed: "Up to 100Mbps" },
  { name: "Port Elizabeth", province: "Eastern Cape", lat: -33.9608, lng: 25.6022, status: "coming", speed: "Coming 2025" },
  { name: "Johannesburg", province: "Gauteng", lat: -26.2041, lng: 28.0473, status: "coming", speed: "Coming 2025" },
  { name: "Komani", province: "Eastern Cape", lat: -31.9005, lng: 26.8753, status: "partial", speed: "Up to 100Mbps" },
];

function CoveragePage({ setPage, setCoveredArea }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [selectedDot, setSelectedDot] = useState(null);
  const isMobile = window.innerWidth < 768;

  const check = (q = query) => {
    if (!q.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const match = COVERAGE_AREAS.find(a => a.name.toLowerCase().includes(q.toLowerCase()) || a.province.toLowerCase().includes(q.toLowerCase()));
      setResult(match || { name: q, status: "none" });
      if (match) setSelectedDot(match.name);
      setSearching(false);
    }, 800);
  };

  const statusInfo = {
    full: { label: "Full Coverage", color: "#22c55e", icon: "✅", msg: "We have full fibre & 5G coverage in your area." },
    partial: { label: "Partial Coverage", color: "#f59e0b", icon: "⚡", msg: "Limited coverage available. 5G wireless options in your area." },
    coming: { label: "Coming Soon", color: "#3d4db5", icon: "🔜", msg: "We are expanding to your area soon. Register your interest." },
    none: { label: "Not Yet Covered", color: C.muted, icon: "❌", msg: "Not yet covered. Register your interest and we will notify you." },
  };

  const toSVG = (lat, lng) => ({ x: ((lng - 16) / 17) * 480 + 10, y: ((lat - (-22)) / -13) * 280 + 10 });

  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "100px 24px 60px" : "120px 80px 80px", position: "relative" }}>
      <FloatingOrb size={400} color={C.navy} top={-80} right={-80} delay={0} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 680, margin: "0 auto 48px", textAlign: "center" }}>
          <Badge>Coverage Checker</Badge>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Are we in <GradText>your area?</GradText>
          </h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>Search your town or suburb to check fibre and 5G availability.</p>
          <div style={{ display: "flex", gap: 12, maxWidth: 520, margin: "0 auto 20px" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
              <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && check()}
                placeholder="e.g. East London, Butterworth..."
                style={{ width: "100%", padding: "14px 16px 14px 44px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
            </div>
            <Btn onClick={() => check()}>{searching ? "Checking…" : "Check"}</Btn>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {COVERAGE_AREAS.slice(0, 5).map(a => (
              <button key={a.name} onClick={() => { setQuery(a.name); check(a.name); }}
                style={{ padding: "6px 16px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, color: C.muted, fontSize: 12, cursor: "pointer" }}>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ maxWidth: 520, margin: "0 auto 40px", animation: "scaleIn .4s ease both" }}>
            <div style={{ background: C.glass, border: `1px solid ${statusInfo[result.status]?.color + "55" || C.glassBorder}`, borderRadius: 20, padding: "28px 32px", backdropFilter: "blur(20px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <span style={{ fontSize: 32 }}>{statusInfo[result.status]?.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800 }}>{result.name}</div>
                  <div style={{ fontSize: 11, color: statusInfo[result.status]?.color, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{statusInfo[result.status]?.label}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.65, marginBottom: 20, fontWeight: 300 }}>{statusInfo[result.status]?.msg}</p>
              {result.speed && <div style={{ background: statusInfo[result.status].color + "18", border: `1px solid ${statusInfo[result.status].color}33`, borderRadius: 10, padding: "10px 16px", fontSize: 13, color: statusInfo[result.status].color, marginBottom: 20 }}>📶 {result.speed}</div>}
              {(result.status === "full" || result.status === "partial") && (
                <Btn onClick={() => { setCoveredArea(result); setPage("order"); }} style={{ width: "100%", justifyContent: "center" }}>Order Now for {result.name} →</Btn>
              )}
              {(result.status === "coming" || result.status === "none") && (
                <Btn onClick={() => setPage("contact")} variant="outline" style={{ width: "100%", justifyContent: "center" }}>Register My Interest →</Btn>
              )}
            </div>
          </div>
        )}

        {/* Google Maps embed */}
        <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700 }}>Coverage Map</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Eastern Cape & expanding nationally</div>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[["#22c55e", "Full"], ["#f59e0b", "Partial"], ["#3d4db5", "Coming Soon"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />{l}
                </div>
              ))}
            </div>
          </div>
          {/* SVG Map */}
          <div style={{ borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,.02)", border: `1px solid ${C.glassBorder}` }}>
            <svg viewBox="0 0 500 300" style={{ width: "100%", display: "block" }}>
              <path d="M80,20 L200,10 L350,25 L450,80 L490,160 L460,240 L380,290 L280,310 L180,300 L100,260 L50,200 L30,130 Z" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
              {[0,1,2,3].map(i => <line key={`h${i}`} x1="0" y1={i*80} x2="500" y2={i*80} stroke="rgba(255,255,255,.03)" strokeWidth="1" />)}
              {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={i*100} y1="0" x2={i*100} y2="300" stroke="rgba(255,255,255,.03)" strokeWidth="1" />)}
              {COVERAGE_AREAS.map(a => {
                const p = toSVG(a.lat, a.lng);
                const col = a.status === "full" ? "#22c55e" : a.status === "partial" ? "#f59e0b" : "#3d4db5";
                const sel = selectedDot === a.name;
                return (
                  <g key={a.name} style={{ cursor: "pointer" }} onClick={() => { setQuery(a.name); check(a.name); }}>
                    {sel && <circle cx={p.x} cy={p.y} r="18" fill={col} opacity=".15" />}
                    <circle cx={p.x} cy={p.y} r={sel ? 10 : 7} fill={col} opacity={sel ? 1 : .75} stroke={sel ? "#fff" : "transparent"} strokeWidth="2" />
                    <text x={p.x} y={p.y - 12} textAnchor="middle" fill="rgba(255,255,255,.65)" fontSize="8.5" fontFamily="DM Sans,sans-serif">{a.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          {/* Google Maps link */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <a href="https://maps.google.com/maps?q=Eastern+Cape+South+Africa" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: C.magenta, textDecoration: "none", fontWeight: 500 }}>
              📍 View on Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT PAGE ──────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const isMobile = window.innerWidth < 768;
  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "100px 24px 60px" : "120px 80px 80px", position: "relative" }}>
      <FloatingOrb size={500} color={C.magenta} top={-100} right={-100} delay={0} />
      <FloatingOrb size={300} color={C.navy} bottom={200} left={-80} delay={-4} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1000, margin: "0 auto" }}>
        <Badge>Our Story</Badge>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24, maxWidth: 600 }}>
          Built in Butterworth.<br /><GradText>Built for Africa.</GradText>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.6)", lineHeight: 1.8, maxWidth: 640, marginBottom: 56, fontWeight: 300 }}>
          Isu Elihle Solutions was born from a simple belief — that every South African, regardless of where they live, deserves access to world-class digital connectivity. Founded in the Eastern Cape and rooted in the communities we serve, we are on a mission to bridge the digital divide, one connection at a time.
        </p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 16, marginBottom: 64 }}>
          {[["100%", "Black-Owned"], ["B-BBEE", "Level 1"], ["2023", "Founded"], ["EC", "Based"]].map(([n, l]) => (
            <TiltCard key={l}>
              <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 18, padding: "24px 20px", textAlign: "center", backdropFilter: "blur(20px)" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, ...gradText }}>{n}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginTop: 4 }}>{l}</div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Mission & Vision */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 64 }}>
          {[
            { icon: "🎯", title: "Our Mission", desc: "To provide affordable, reliable, and cutting-edge ICT solutions that empower individuals, businesses, and communities across South Africa — with a particular focus on underserved rural and semi-urban areas." },
            { icon: "🔭", title: "Our Vision", desc: "To be the leading black-owned ICT and connectivity provider in South Africa — known for innovation, community impact, and unwavering commitment to digital inclusion." },
          ].map(c => (
            <TiltCard key={c.title} intensity={8}>
              <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 20, padding: "32px 28px", height: "100%" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.75, fontWeight: 300 }}>{c.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Team */}
        <div style={{ marginBottom: 64 }}>
          <SectionTag>Leadership</SectionTag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 32 }}>The People Behind the Mission</h2>
          <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
            <TiltCard intensity={12}>
              <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: "36px 32px", maxWidth: 320, textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: grad(90) }} />
                <div style={{ width: 90, height: 90, borderRadius: "50%", background: grad(), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, margin: "0 auto 20px", boxShadow: "0 0 40px rgba(191,34,147,.4)" }}>SM</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Siyanda Makupula</div>
                <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.magenta, fontWeight: 600, marginBottom: 16 }}>Founder & Director</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.7, fontWeight: 300 }}>Entrepreneur, ICT consultant, and visionary driving digital inclusion across South Africa\'s underserved communities.</p>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* B-BBEE */}
        <div style={{ background: "linear-gradient(135deg, rgba(191,34,147,.1), rgba(44,55,146,.1))", border: "1px solid rgba(191,34,147,.2)", borderRadius: 20, padding: "36px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>🏆 B-BBEE Level 1 Certified</h3>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, fontWeight: 300, maxWidth: 420 }}>100% Black Male-Owned. We proudly hold B-BBEE Level 1 status — the highest level of transformation compliance — making us an ideal procurement partner for government and enterprise clients.</p>
          </div>
          <Btn onClick={() => setPage("contact")} style={{ flexShrink: 0 }}>Partner with Us →</Btn>
        </div>
      </div>
    </div>
  );
}

// ── ORDER PAGE ──────────────────────────────────────────────────
function OrderPage({ coveredArea, setPage, setOrderRef }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", idNumber: "", address: "", suburb: "", city: coveredArea?.name || "", province: coveredArea?.province || "Eastern Cape", service: "fibre", plan: "Home 200", installation: "standard", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const isMobile = window.innerWidth < 768;
  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const steps = ["Your Details", "Service & Plan", "Address", "Confirm"];
  const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.glassBorder}`, borderRadius: 12, color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 300 };
  const labelStyle = { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, fontWeight: 500, marginBottom: 6, display: "block" };
  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Could not place order. Please try again.");
        return;
      }
      const { reference } = await res.json();
      setOrderRef({ ref: reference, form, date: new Date().toISOString() });
      setPage("track");
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "100px 24px 60px" : "120px 80px 80px", position: "relative" }}>
      <FloatingOrb size={400} color={C.navy} top={-80} right={-80} delay={0} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
        <SectionTag>Order Form</SectionTag>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 8 }}>Get <GradText>Connected</GradText></h1>
        {coveredArea && <p style={{ color: C.muted, fontSize: 14, marginBottom: 36 }}>Ordering for: <strong style={{ color: "#fff" }}>{coveredArea.name}</strong></p>}
        {!coveredArea && <p style={{ color: C.muted, fontSize: 14, marginBottom: 36 }}>Our team will confirm coverage for your address.</p>}

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: step > i + 1 ? "pointer" : "default" }} onClick={() => step > i + 1 && setStep(i + 1)}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: step > i + 1 ? grad() : step === i + 1 ? "rgba(191,34,147,.3)" : C.glass, border: `2px solid ${step >= i + 1 ? C.magenta : C.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: step > i + 1 ? 13 : 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, transition: "all .3s" }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? grad(90) : C.glassBorder, margin: "0 10px", transition: "background .4s" }} />}
            </div>
          ))}
        </div>

        <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: isMobile ? "28px 20px" : "36px 40px", animation: "slideIn .35s ease both" }}>
          {step === 1 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Tell us about yourself</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => upd("firstName", e.target.value)} placeholder="Sipho" /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => upd("lastName", e.target.value)} placeholder="Dlamini" /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Email</label><input style={inputStyle} type="email" value={form.email} onChange={e => upd("email", e.target.value)} placeholder="sipho@email.co.za" /></div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                <div><label style={labelStyle}>Phone</label><input style={inputStyle} type="tel" value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="071 234 5678" /></div>
                <div><label style={labelStyle}>ID Number (Optional)</label><input style={inputStyle} value={form.idNumber} onChange={e => upd("idNumber", e.target.value)} placeholder="For RICA" /></div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Choose your service</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[["fibre","⚡","Fibre"],["5g","📡","5G"],["ict","🖥️","ICT"],["analytics","📊","Analytics"]].map(([val,icon,lab]) => (
                  <div key={val} onClick={() => upd("service", val)} style={{ padding: "14px", background: form.service === val ? "rgba(191,34,147,.15)" : "rgba(255,255,255,.03)", border: `2px solid ${form.service === val ? C.magenta : C.glassBorder}`, borderRadius: 14, cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{icon}</span><span style={{ fontSize: 13, fontWeight: 500 }}>{lab}</span>
                  </div>
                ))}
              </div>
              {(form.service === "fibre" || form.service === "5g") && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                  {(SERVICE_DATA[form.service]?.plans || []).map(p => (
                    <div key={p.name} onClick={() => upd("plan", p.name)} style={{ padding: "14px 12px", textAlign: "center", background: form.plan === p.name ? "rgba(191,34,147,.15)" : "rgba(255,255,255,.03)", border: `2px solid ${form.plan === p.name ? C.magenta : C.glassBorder}`, borderRadius: 14, cursor: "pointer" }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, ...gradText }}>{p.price}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, margin: "4px 0" }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{p.speed}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Installation address</div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Street Address</label><input style={inputStyle} value={form.address} onChange={e => upd("address", e.target.value)} placeholder="123 Main Street" /></div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div><label style={labelStyle}>Suburb</label><input style={inputStyle} value={form.suburb} onChange={e => upd("suburb", e.target.value)} placeholder="e.g. Vincent" /></div>
                <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={e => upd("city", e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Province</label>
                <select style={{ ...inputStyle, appearance: "none" }} value={form.province} onChange={e => upd("province", e.target.value)}>
                  {["Eastern Cape","Gauteng","Western Cape","KwaZulu-Natal","Limpopo","Mpumalanga","Free State","Northern Cape","North West"].map(p => <option key={p} style={{ background: "#1a1a2e" }}>{p}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>Special Instructions</label><textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={form.notes} onChange={e => upd("notes", e.target.value)} placeholder="e.g. flat number, access code..." /></div>
            </div>
          )}
          {step === 4 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Review your order</div>
              {[["Customer",`${form.firstName} ${form.lastName}`],["Email",form.email],["Phone",form.phone],["Service",form.service.toUpperCase()],["Plan",form.plan],["City",form.city],["Province",form.province]].filter(([,v]) => v?.trim()).map(([k,v]) => (
                <div key={k} style={{ display: "flex", padding: "12px 0", borderBottom: `1px solid ${C.glassBorder}` }}>
                  <div style={{ width: 140, fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{k}</div>
                  <div style={{ fontSize: 14 }}>{v}</div>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(191,34,147,.08)", border: "1px solid rgba(191,34,147,.2)", borderRadius: 12, fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.65, fontWeight: 300 }}>
                📋 By placing this order, you agree that Isu Elihle Solutions will contact you to confirm your address and schedule installation.
              </div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            {step > 1 ? <Btn onClick={() => setStep(s => s - 1)} variant="outline">← Back</Btn> : <div />}
            {step < 4 ? <Btn onClick={() => setStep(s => s + 1)}>Continue →</Btn> : <Btn onClick={submit} style={{ minWidth: 160, justifyContent: "center" }}>{submitting ? "Placing Order…" : "Place Order ✓"}</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TRACK PAGE ──────────────────────────────────────────────────
function TrackPage({ orderRef, setPage }) {
  const [queryRef, setQueryRef] = useState(orderRef?.ref || "");
  const [tracking, setTracking] = useState(orderRef || null);
  const [searching, setSearching] = useState(false);
  const isMobile = window.innerWidth < 768;

  const STATUS_ORDER = ["received", "processing", "scheduled", "installing", "testing", "active"];
  const currentStatusIdx = Math.max(0, STATUS_ORDER.indexOf(tracking?.status || "received"));
  const MILESTONES = [
    { key: "received", label: "Order Received", icon: "📋", desc: "Your order has been submitted and is being reviewed.", date: tracking?.date ? new Date(tracking.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" }) : "" },
    { key: "processing", label: "Processing", icon: "⚙️", desc: "Verifying address, confirming coverage, preparing installation schedule.", date: "" },
    { key: "scheduled", label: "Installation Scheduled", icon: "📅", desc: "A technician has been assigned and your installation date confirmed.", date: "" },
    { key: "installing", label: "Installation In Progress", icon: "🔧", desc: "Our technician is on-site setting up your connection.", date: "" },
    { key: "testing", label: "Testing & Activation", icon: "📶", desc: "Your connection is being tested and activated.", date: "" },
    { key: "active", label: "Connection Active", icon: "✅", desc: "Your service is live! Welcome to Isu Elihle Solutions.", date: "" },
  ].map((m, i) => ({ ...m, done: i <= currentStatusIdx }));

  const search = async () => {
    const ref = queryRef.trim().toUpperCase();
    if (!ref) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(ref)}`);
      if (res.status === 404) {
        alert("Order reference not found.");
        setTracking(null);
        return;
      }
      if (!res.ok) {
        alert("Could not load order. Please try again.");
        return;
      }
      const data = await res.json();
      setTracking({
        ref: data.reference,
        status: data.status,
        date: data.createdAt,
        form: { firstName: data.firstName, city: data.city, service: data.service, plan: data.plan },
      });
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "100px 24px 60px" : "120px 80px 80px", position: "relative" }}>
      <FloatingOrb size={400} color={C.purple} top={-80} right={-80} delay={0} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
        <SectionTag>Order Tracking</SectionTag>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>Track Your <GradText>Order</GradText></h1>
        <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, marginBottom: 36 }}>Enter your order reference to see real-time status.</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <input value={queryRef} onChange={e => setQueryRef(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="e.g. IES-ABC123"
            style={{ flex: 1, padding: "13px 18px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.05em" }} />
          <Btn onClick={search}>{searching ? "Searching…" : "Track"}</Btn>
        </div>
        {tracking && (
          <div style={{ animation: "fadeUp .4s ease both" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(44,55,146,.2), rgba(191,34,147,.1))", border: "1px solid rgba(191,34,147,.25)", borderRadius: 18, padding: "22px 28px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4 }}>Reference</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "0.05em" }}>{tracking.ref}</div>
              </div>
              <div style={{ padding: "8px 18px", background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 50, fontSize: 12, color: "#22c55e", fontWeight: 600, textTransform: "capitalize" }}>● {tracking.status || "Received"}</div>
            </div>
            <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 22, padding: "32px 36px" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 28 }}>Installation Milestones</div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 21, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${C.magenta}, rgba(44,55,146,.2))`, borderRadius: 1 }} />
                {MILESTONES.map((m, i) => (
                  <div key={m.key} style={{ display: "flex", gap: 20, marginBottom: i < MILESTONES.length - 1 ? 28 : 0, animation: `slideIn .4s ease ${i * .1}s both` }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: m.done ? grad() : "rgba(255,255,255,.05)", border: `2px solid ${m.done ? C.magenta : C.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: m.done ? 18 : 13, flexShrink: 0, zIndex: 1, boxShadow: m.done ? "0 0 20px rgba(191,34,147,.35)" : "none" }}>
                      {m.done ? m.icon : i + 1}
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: m.done ? "#fff" : "rgba(255,255,255,.35)" }}>{m.label}</div>
                        {m.date && <div style={{ fontSize: 11, color: m.done ? C.magenta : C.muted, background: m.done ? "rgba(191,34,147,.1)" : "transparent", padding: "2px 10px", borderRadius: 50 }}>{m.date}</div>}
                      </div>
                      <div style={{ fontSize: 13, color: m.done ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.25)", lineHeight: 1.6, fontWeight: 300 }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!tracking && !searching && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Enter your reference number</div>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>Or place a new order to get started.</p>
            <Btn onClick={() => setPage("order")}>Place an Order →</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CONTACT PAGE ────────────────────────────────────────────────
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "General Enquiry", message: "" });
  const isMobile = window.innerWidth < 768;
  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,.05)", border: `1px solid rgba(255,255,255,.09)`, borderRadius: 12, color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 300 };
  const labelStyle = { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, fontWeight: 500, marginBottom: 6, display: "block" };

  const handleSubmit = async () => {
    try {
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (e) {}
    setSent(true);
  };

  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "100px 24px 60px" : "120px 80px 80px", position: "relative" }}>
      <FloatingOrb size={500} color={C.navy} top={-100} right={-100} delay={0} />
      <FloatingOrb size={300} color={C.magenta} bottom={100} left={-60} delay={-4} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr", gap: isMobile ? 48 : 80, maxWidth: 1100, margin: "0 auto", alignItems: "start" }}>
          <div>
            <Badge>Contact Us</Badge>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>Let\'s Connect <GradText>Your World.</GradText></h1>
            <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.7, marginBottom: 36 }}>Whether you\'re a home user, business, municipality, or partner — we\'d love to hear from you.</p>
            {[["📍","Eastern Cape, South Africa"],["🌐","www.isu-elihle.co.za"],["📧","hello@isu-elihle.co.za"],["💬","WhatsApp: Available via chat button"]].map(([icon,val]) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14, color: "rgba(255,255,255,.7)", marginBottom: 14 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>{val}
              </div>
            ))}
          </div>

          <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: isMobile ? "28px 20px" : "40px", backdropFilter: "blur(20px)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 16, animation: "scaleIn .4s ease" }}>✅</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Message Sent!</div>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14 }}>We\'ll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => upd("firstName", e.target.value)} placeholder="Sipho" /></div>
                  <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => upd("lastName", e.target.value)} placeholder="Dlamini" /></div>
                </div>
                {[["Email","email","hello@company.co.za"],["Phone","tel","071 234 5678"]].map(([l,t,p]) => (
                  <div key={l} style={{ marginBottom: 14 }}><label style={labelStyle}>{l}</label><input type={t} placeholder={p} style={inputStyle} value={form[l.toLowerCase()]} onChange={e => upd(l.toLowerCase(), e.target.value)} /></div>
                ))}
                <div style={{ marginBottom: 14 }}><label style={labelStyle}>Subject</label>
                  <select style={{ ...inputStyle, appearance: "none" }} value={form.subject} onChange={e => upd("subject", e.target.value)}>
                    {["General Enquiry","Fibre / 5G Quote","Business ICT","Partnership","Technical Support","Other"].map(o => <option key={o} style={{ background: "#1a1a2e" }}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}><label style={labelStyle}>Message</label><textarea placeholder="How can we help?" style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} value={form.message} onChange={e => upd("message", e.target.value)} /></div>
                <Btn onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>Send Message →</Btn>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
function Footer({ setPage }) {
  const isMobile = window.innerWidth < 768;
  return (
    <footer style={{ borderTop: `1px solid ${C.glassBorder}`, padding: isMobile ? "40px 24px" : "60px 80px", background: "rgba(255,255,255,.01)", position: "relative", zIndex: 2 }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr", gap: 40, maxWidth: 1100, margin: "0 auto 40px" }}>
        <div>
          <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 16 }}>
            <img src={`data:image/png;base64,${ICON_B64}`} alt="logo" style={{ height: 32 }} />
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: "0.08em" }}>ISU ELIHLE SOLUTIONS</div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em" }}>Business Consultants</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, fontWeight: 300, maxWidth: 280 }}>Connecting Africa to a brighter digital future. 100% Black-Owned. B-BBEE Level 1.</p>
        </div>
        {[
          { title: "Services", links: [["Fibre Connectivity","fibre"],["5G Solutions","5g"],["ICT Solutions","ict"],["Business Analytics","analytics"],["Internet of Things","iot"],["Digital Advertising","digital"]] },
          { title: "Company", links: [["About Us","about"],["Coverage","coverage"],["Contact","contact"],["Order Now","order"],["Track Order","track"]] },
          { title: "Legal", links: [["Privacy Policy","#"],["Terms of Service","#"],["POPIA Compliance","#"]] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>{col.title}</div>
            {col.links.map(([lab, id]) => (
              <div key={lab} onClick={() => setPage(id)} style={{ fontSize: 13, color: C.muted, marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = C.magenta} onMouseLeave={e => e.target.style.color = C.muted}>
                {lab}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.glassBorder}`, paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, maxWidth: 1100, margin: "0 auto", fontSize: 12, color: C.muted }}>
        <div>© 2025 Isu Elihle Solutions (Pty) Ltd. All rights reserved. Reg: 2023/241519/07</div>
        <div>Vox Telecom Reseller Partner</div>
      </div>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [coveredArea, setCoveredArea] = useState(null);
  const [orderRef, setOrderRef] = useState(null);

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const SERVICE_IDS = ["fibre","5g","ict","analytics","iot","digital"];

  return (
    <>
      <style>{G}</style>
      <ParticleCanvas />
      <Nav page={page} setPage={navigate} />
      <main style={{ position: "relative", zIndex: 1 }}>
        {page === "home" && <HomePage setPage={navigate} />}
        {page === "services" && <ServicesPage setPage={navigate} />}
        {SERVICE_IDS.includes(page) && <ServicePage serviceId={page} setPage={navigate} />}
        {page === "coverage" && <CoveragePage setPage={navigate} setCoveredArea={setCoveredArea} />}
        {page === "order" && <OrderPage coveredArea={coveredArea} setPage={navigate} setOrderRef={setOrderRef} />}
        {page === "track" && <TrackPage orderRef={orderRef} setPage={navigate} />}
        {page === "about" && <AboutPage setPage={navigate} />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer setPage={navigate} />
      <WhatsAppButton />
    </>
  );
}
