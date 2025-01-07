package com.example.DKHP_UIT.support_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.DKHP_UIT.entities.Class;
import com.example.DKHP_UIT.entities.Student;
import com.example.DKHP_UIT.entities.Subject;
import com.example.DKHP_UIT.repository.ClassRepository;
import com.example.DKHP_UIT.repository.StudentRepository;
import com.example.DKHP_UIT.repository.SubjectRepository;

import java.util.Random;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;
import java.util.HashSet;

@Component
public class SupportStudentService {
    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private StudentRepository studentRepository;

    private String[] characters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f", "g",
            "h", "i", "j", "k", "l", "m", "n", "o", "v", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" };

    public String createPassword() {
        String s = "";
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            int randomNumber = random.nextInt(characters.length - 1 - 0 + 1) + 0;
            s = s + characters[randomNumber];
        }
        return s;
    }

    public List<com.example.DKHP_UIT.entities.Class> listNewClasses(List<String> classes) {
        List<com.example.DKHP_UIT.entities.Class> listClass = new ArrayList<>();
        for (int i = 0; i < classes.size(); i++) {
            com.example.DKHP_UIT.entities.Class class1 = this.classRepository.findById(classes.get(i)).get();
            listClass.add(class1);
        }
        return listClass;
    }

    public void dkhp(List<Class> newClasses, List<String> listWrong,
        List<String> listTrue, List<String> listProblem, String mssv) {

            for (int i = 0; i < newClasses.size(); i++) {
                Class currentClass = newClasses.get(i);
                // check whether this class is theory or practice class
                if (currentClass.getFlagTH() == 0 || currentClass.getFlagTH() == 3) {
                    // check siso
                    if (checkSiSo(listWrong, listProblem, currentClass) == false) {
                        continue;
                    }
                    // check first subject
                    if (checkFirstSubject(listWrong, listProblem, currentClass) == false) {
                        continue;
                    }
                    // check whether this class has practice or not practice class
                    if (havePracticeClass(currentClass.getId())) {
                        // check whether it is the end of list
                        if (i == newClasses.size() - 1) {
                            addWrongClass("NonPractice", listWrong, listProblem, currentClass.getId());
                            continue;
                        }
                        Class nextClass = newClasses.get(i+1);
                        // check continue class
                        if (checkContinueClassOfTheoryClass(nextClass, currentClass, listWrong,
                                listProblem) == false) {
                            continue;
                        } else {
                            // check schedule of current class
                            if (checkStudentSchedule(mssv, currentClass) == false) {
                                addWrongClass("Schedule", listWrong, listProblem, currentClass.getId());
                            }
                            // check schedule of continue class
                            if (nextClass.getFlagTH() == 1
                                    && checkStudentSchedule(mssv, nextClass) == false) {
                                continue;
                            }
                            // save
                            Student student = this.studentRepository.findById(mssv).get();
                            student.getClasses().add(currentClass);
                            student.getClasses().add(nextClass);

                            // Tăng currentSiSo của cả 2 lớp
                            updateCurrentSiSo(currentClass, 1);
                            updateCurrentSiSo(nextClass, 1);


                            listTrue.add(currentClass.getId());
                            listTrue.add(nextClass.getId());
                            this.studentRepository.save(student);
                            i = i + 1;
                        }
                    } else {
                        System.out.println("nguyentandungdeptrai123");
                        // check schedule of current class
                        if (checkStudentSchedule(mssv, currentClass) == false) {
                            addWrongClass("Schedule", listWrong, listProblem, currentClass.getId());
                            continue;
                        } // save
                        Student student = this.studentRepository.findById(mssv).get();
                        student.getClasses().add(currentClass);

                        // Tăng currentSiSo
                        updateCurrentSiSo(currentClass, 1);

                        listTrue.add(currentClass.getId());
                        this.studentRepository.save(student);
                    }
                } else {
                    // add wrong
                    addWrongClass("NonTheory", listWrong, listProblem, currentClass.getId());
                }
            }
    }


    private void updateCurrentSiSo(Class myClass, int amount) {
        myClass.setCurrentSiSo(myClass.getCurrentSiSo() + amount);
        this.classRepository.save(myClass);
    }


    public void undkhp(List<Class> registeredClasses, List<String> listWrong,
                    List<String> listTrue, List<String> listProblem, String mssv, List<String> listClassId) {
        List<String> classIds = new ArrayList<>(listClassId);
        Student student = this.studentRepository.findById(mssv).get();
        System.out.println("Start undkhp with mssv: " + mssv);
        System.out.println("List classes need remove " + listClassId);
        System.out.println("List classes registered " + registeredClasses.size());
        System.out.println("Student has class:" + student.getClasses().size());


        for (String classId : classIds) {
            Class registeredClass = registeredClasses.stream()
                    .filter(c -> c.getId().equals(classId))
                    .findFirst()
                    .orElse(null);
            if (registeredClass == null) {
                addWrongClass("NotRegistered", listWrong, listProblem, classId);
                continue;
            }

            if (registeredClass.getFlagTH() == 0 || registeredClass.getFlagTH() == 3 || registeredClass.getFlagTH() == 1) {
                // Unregister lớp hiện tại
                this.studentRepository.removeClassesFromStudent(mssv, classId);
                updateCurrentSiSo(registeredClass, -1);
                listTrue.add(classId);


                if (registeredClass.getFlagTH() == 0) {
                    // Nếu là lớp lý thuyết, tìm và xóa lớp thực hành tương ứng trong danh sách đã đăng ký
                    registeredClasses.stream()
                        .filter(c -> c.getFlagTH() == 1 && c.getIdLT() != null && c.getIdLT().equals(classId))
                        .findFirst() // Find the first matching practical class
                        .ifPresent(practicalClass -> {
                            this.studentRepository.removeClassesFromStudent(mssv, practicalClass.getId());
                            updateCurrentSiSo(practicalClass, -1);
                            listTrue.add(practicalClass.getId());
                        });

                }
            } else {
                addWrongClass("NonTheory", listWrong, listProblem, classId);
            }

        }
    }
    public boolean checkStudentSchedule(String mssv, Class newClass) {
        List<List<Integer>> listScheduleIn1Day = this.studentRepository.getStudentScheduleIn1Day(newClass.getThu(),
                mssv);
        // System.out.println("==================================================");
        // System.out.println(listScheduleIn1Day);
        // System.out.println(newClass.getTietBatDau() + " " +
        // newClass.getTietKetThuc());
        return checkAllSchedule(newClass.getTietBatDau(), newClass.getTietKetThuc(), listScheduleIn1Day);
    }

    private boolean check2Schedult(int tietBD1, int tietKT1, int tietBD2, int tietKT2) {
        if (tietKT2 < tietBD1) {
            return true;
        }
        if (tietBD2 > tietKT1) {
            return true;
        }
        return false;
    }

    private boolean checkAllSchedule(int tietBD, int tietKT, List<List<Integer>> list) {
        for (int i = 0; i < list.size(); i++) {
            if (check2Schedult(list.get(i).get(0), list.get(i).get(1), tietBD, tietKT) == false) {
                return false;
            }
        }
        return true;
    }

    public boolean checkContinueClassOfTheoryClass(Class continueClass, Class currentClass, List<String> listWrong,
            List<String> listProblem) {
        if (continueClass.getFlagTH() == 0) {
            addWrongClass("NonPractice", listWrong, listProblem, currentClass.getId());
            return false;
        }
        if (continueClass.getIdLT().equals(currentClass.getId()) == false) {
            addWrongClass("NonPractice", listWrong, listProblem, currentClass.getId());
            return false;
        }
        if (continueClass.getFlagTH() == 1) {
            if (continueClass.getCurrentSiSo() == currentClass.getSiso()) {
                addWrongClass("SiSoTH", listWrong, listProblem, currentClass.getId());
                return false;
            }
        }
        return true;
    }

    public boolean havePracticeClass(String classId) {
        int numberOfPracticeClasses = this.classRepository.getNumberOfPractices(classId);
        if (numberOfPracticeClasses >= 1) {
            return true;
        }
        return false;
    }

    public boolean checkSiSo(List<String> listWrong, List<String> listProblem, Class newClass) {
        if (newClass.getCurrentSiSo() == newClass.getSiso()) {
            listWrong.add(newClass.getId());
            listProblem.add("SiSo");
            return false;
        }
        return true;
    }

    public boolean checkFirstSubject(List<String> listWrong, List<String> listProblem, Class newClass) {
        int flag = 0;
        Subject subject = newClass.getSubject();
        List<String> listFirstSubjects = subject.getDsMaMonHocTruoc();
        // create listFirstSubjects
        String problem = "";
        for (int i = 0; i < listFirstSubjects.size(); i++) {
            problem = problem + "-" + listFirstSubjects.get(i);
        }
        if (listFirstSubjects.size() > 0) {
            listWrong.add(newClass.getId());
            listProblem.add(problem);
            flag = 1;
        }
        if (flag == 0) {
            return true;
        }
        return false;
    }

    public void sortList(List<Class> newClasses) {
        newClasses.sort((class1, class2) -> class1.getClassName().compareTo(class2.getClassName()));
    }

    public void addWrongClass(String problem, List<String> listWrong, List<String> listProblem, String maMonHoc) {
        listWrong.add(maMonHoc);
        listProblem.add(problem);
    }

    public static void main(String args[]) {
        String[] list = { "SE101.1", "SE101", "SE101.1.1", "CE100", "CE100.1", "CE100.1.1" };

        List<String> list1 = new ArrayList<>();
        for (int i = 0; i < list.length; i++) {
            list1.add(list[i]);
        }

        list1.sort((class1, class2) -> class1.compareTo(class2));

        System.out.println(list1);
    }
}